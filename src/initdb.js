// src/initdb.sh

// dependencies
import { Database } from "bun:sqlite";
import fs from "fs";
import matter from "gray-matter";

// create a new database instance
const db = new Database("./src/blog.db");

// create the posts table in the database
db.run(`CREATE TABLE IF NOT EXISTS articles (
  article_id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_title TEXT,
  article_date TEXT,
  article_slug TEXT,
  article_category TEXT,
  article_summary TEXT,
  article_content TEXT
)`);

// read in the markdown files from the content folder
const folderPath = "./src/content/";
const files = fs.readdirSync(folderPath);

// iterate through the files and read their contents
let articles = [];
for (const file of files) {
  const filePath = `${folderPath}/${file}`;
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  articles.push(fileContents);
}

// iterate over the array of articles, parse with frontmatter
let parsedArticles = [];
for (const article of articles) {
  let frontmatter = matter(article);
  parsedArticles.push(frontmatter);
}

// create an insert statement to add the content into the database, bind it to a const variable
const insertStmt = db.prepare(`INSERT INTO articles (
  article_title,
  article_date,
  article_slug,
  article_category,
  article_summary,
  article_content
) VALUES (?, ?, ?, ?, ?, ?)`);

// loop over the data and insert it into the database
db.run("BEGIN");
try {
  for (const parsedArticle of parsedArticles) {
    insertStmt.run(parsedArticle.data.title, parsedArticle.data.date, parsedArticle.data.slug, parsedArticle.data.category, parsedArticle.data.summary, parsedArticle.content);
  }
  db.run("COMMIT");
} catch (error) {
  console.error("Failed to insert data:", error);
  db.run("ROLLBACK");
}

// close the database
db.close();
