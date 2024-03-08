// src/initdb.sh

// dependencies
import { Database } from "bun:sqlite";

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

// some seed data for the articles table
const articles = [
  {
    title: "First Post",
    date: "2024-03-03",
    slug: "first-post",
    category: "administrative",
    summary: "This is the summary of the first post.",
    content: "This is the content of the proverbial first post."
  },
  {
    title: "Second Post",
    date: "2024-03-03",
    slug: "second-post",
    category: "administrative",
    summary: "This is the summary of the first post.",
    content: "This is the content of the second post."
  },
];

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
  for (const article of articles) {
    insertStmt.run(article.title, article.date, article.slug, article.category, article.summary, article.content);
  }
  db.run("COMMIT");
} catch (error) {
  console.error("Failed to insert data:", error);
  db.run("ROLLBACK");
}

// close the database
db.close();
