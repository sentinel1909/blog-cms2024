// src/routes/delete_article.ts

// deletes the selected article from the database

const DeleteArticle = (db: any, articleId: any) => {
  db.run("DELETE FROM articles WHERE article_id = ?", articleId.articleId);

  return (
    `<article>
        <p>Article deleted</p>
     </article>
    `
  )
};

export default DeleteArticle;
