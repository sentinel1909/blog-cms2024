// src/routes/create_article.ts

// route handler which inserts form data into the database
const CreateArticle = (db: any, body: any) => {
  // bind the database insert query to a variable
  const insertStmt = db.prepare(`INSERT INTO articles (
    article_title,
    article_date,
    article_slug,
    article_category,
    article_summary,
    article_content
  ) VALUES (?, ?, ?, ?, ?, ?)`);

  // run the insert query
  db.run("BEGIN");
  try {
    insertStmt.run(
      body.title,
      body.date,
      body.slug,
      body.category,
      body.summary,
      body.content,
    );
    db.run("COMMIT");
    return `<fieldset>
        <form class="create-article-form" id="create-article-form" hx-post="/create-article" hx-target="#create-article-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="slug">Slug: </label>
          <input type="text" id="slug" name="slug" />
          <label for="slug">Category: </label>
          <input type="text" id="category name="category" />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50"></textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <span>Form submitted successfully.</span>
      </fieldset>`;
  } catch (error) {
    console.error("Failed to insert data:", error);
    db.run("ROLLBACK");
    return `<fieldset>
        <form class="create-article-form" id="create-article-form" hx-post="/create-article" hx-target="#create-article-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="slug">Slug: </label>
          <input type="text" id="slug" name="slug" />
          <label for="slug">Category: </label>
          <input type="text" id="category name="category" />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50"></textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <span>Error: Duplicate article title, please create something new.</span>
      </fieldset>`
  }
};

export default CreateArticle;
