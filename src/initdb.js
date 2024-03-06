// src/initdb.sh

// dependencies
import { Database } from "bun:sqlite";

// create a new database instance
const db = new Database("./src/blog.db");

// create the posts table in the database
db.run(`CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_title TEXT,
  post_date TEXT,
  post_slug TEXT,
  post_summary TEXT,
  post_content TEXT
)`);

// some seed data for the posts table
const posts = [
  {
    title: "First Post",
    date: "2024-03-03",
    slug: "first-post",
    summary: "This is the summary of the first post.",
    content: "This is the content of the proverbial first post."
  },
  {
    title: "Second Post",
    date: "2024-03-03",
    slug: "second-post",
    summary: "This is the summary of the first post.",
    content: "This is the content of the second post."
  },
];

// create an insert statement to add the content into the database, bind it to a const variable
const insertStmt = db.prepare(`INSERT INTO posts (
  post_title,
  post_date,
  post_slug,
  post_summary,
  post_content
) VALUES (?, ?, ?, ?, ?)`);

// loop over the data and insert it into the database
db.run("BEGIN");
try {
  for (const post of posts) {
    insertStmt.run(post.title, post.date, post.slug, post.summary, post.content);
  }
  db.run("COMMIT");
} catch (error) {
  console.error("Failed to insert data:", error);
  db.run("ROLLBACK");
}

// close the database
db.close();
