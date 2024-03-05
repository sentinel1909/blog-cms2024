// src/routes/submit_new_post.ts

// route handler which inserts form data into the database
const SubmitNewPost = (db, body) => {
  // bind the database insert query to a variable
  const insertStmt = db.prepare(`INSERT INTO posts (
    post_title,
    post_date,
    post_slug,
    post_content
  ) VALUES (?, ?, ?, ?)`);

  // create the post slug by converting the title from the form input into lower case, splitting on whitespace,
  // then re-joining with a hyphen
  let post_slug = body.title.toLowerCase().split(" ").join("-");

  // run the insert query
  db.run("BEGIN");
  try {
    insertStmt.run(body.title, body.date, post_slug, body.content);
    db.run("COMMIT");
    return `<fieldset id="new-post-form">
          <form class="new-post-form" hx-post="/submit-new-post" hx-target="#new-post-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <p>New post submitted successfully.</p>
      </fieldset>`
  } catch (error) {
    console.error("Failed to insert data:", error);
    db.run("ROLLBACK");
  }
};

export default SubmitNewPost;
