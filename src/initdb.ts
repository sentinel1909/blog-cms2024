// src/initdb.sh

// dependencies
import { Database } from "bun:sqlite";
import fs from "fs";
import matter from "gray-matter";

const db = new Database("./blog.db");

db.run(`CREATE TABLE IF NOT EXISTS articles (
  article_id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_title TEXT NOT NULL UNIQUE,
  article_date TEXT NOT NULL,
  article_slug TEXT NOT NULL,
  article_category TEXT NOT NULL,
  article_summary TEXT NOT NULL,
  article_content TEXT NOT NULL
)`);

const folderPath = "./content/";
const files = fs.readdirSync(folderPath);

let articles = [];
for (const file of files) {
  const filePath = `${folderPath}/${file}`;
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  articles.push(fileContents);
}

let parsedArticles = [];
for (const article of articles) {
  let frontmatter = matter(article);
  parsedArticles.push(frontmatter);
}

const insertStmt = db.prepare(`INSERT INTO articles (
  article_title,
  article_date,
  article_slug,
  article_category,
  article_summary,
  article_content
) VALUES (?, ?, ?, ?, ?, ?)`);

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

db.close();
