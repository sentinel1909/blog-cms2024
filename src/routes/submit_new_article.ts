// src/routes/submit_new_post.ts

// route handler which inserts form data into the database
const SubmitNewArticle = (db: any, body: any) => {
  // bind the database insert query to a variable
  const insertStmt = db.prepare(`INSERT INTO posts (
    post_title,
    post_date,
    post_slug,
    post_summary,
    post_content
  ) VALUES (?, ?, ?, ?, ?)`);

  // create the post slug by converting the title from the form input into lower case, splitting on whitespace,
  // then re-joining with a hyphen
  let article_slug = body.title.toLowerCase().split(" ").join("-");

  // run the insert query
  db.run("BEGIN");
  try {
    insertStmt.run(body.title, body.date, article_slug, body.summary, body.content);
    db.run("COMMIT");
    db.close();
    return `<fieldset>
        <form class="new-article-form" id="new-article-form" hx-post="/submit-new-article" hx-target="#new-article-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50"></textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <span>Form submitted successfully.</span>
      </fieldset>`
  } catch (error) {
    console.error("Failed to insert data:", error);
    db.run("ROLLBACK");
  }
};

export default SubmitNewArticle;
