// src/routes/edit_article.ts

// processes the edits of the content of the selected article

const EditArticle = (db: any, body: any, articleId: any) => {
  
  const insertStmt = db.prepare(`UPDATE articles SET article_content = ? WHERE article_id = ?`);

  db.run("BEGIN");
  try {
    insertStmt.run(body.content, articleId.articleId);
    db.run("COMMIT");
    return (
    `
    <fieldset>
        <form class="edit-article-form" id="edit-article-form">
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
