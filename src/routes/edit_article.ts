// src/routes/edit_article.ts

// processes the edits of the content of the selected article

const EditArticle = (db: any, body: any, articleId: any) => {
  
  const insertStmt = db.prepare(`UPDATE articles SET article_title = ?, article_date = ?, article_slug = ?, article_category = ?, article_summary = ?, article_content = ? WHERE article_id = ?`);
  db.run("BEGIN");
  try {
    insertStmt.run(body.title, body.date, body.slug, body.category, body.summary, body.content, articleId.articleId);
    db.run("COMMIT");
    return (
    `
    <fieldset>
        <form class="edit-article-form" id="edit-article-form">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="title">Slug: </label>
          <input type="text" id="slug" name="slug" />
          <label for="slug">Category: </label>
          <input type="text" id="category" name="category" />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50"></textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <span id="message">Edits submitted successfully</span>
      </fieldset>
    `
    )
  } catch (error) {
    console.error("Failed to insert data:", error);
    db.run("ROLLBACK");
    return (
      `
      <fieldset>
        <form class="edit-article-form" id="edit-article-form">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="title">Slug: </label>
          <input type="text" id="slug" name="slug" />
          <label for="slug">Category: </label>
          <input type="text" id="category" name="category" />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50"></textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
        <span id="message">Failed to insert data: ${error}</span>
      </fieldset>
      `
    )
  }
};

export default EditArticle;
