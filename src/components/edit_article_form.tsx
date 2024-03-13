// src/views/edit_article.tsx

// the edit article view; displays a form to edit the content of the selected article

const EditArticleForm = (props: any) => {
  const query = props.database.query("SELECT * FROM articles WHERE article_id = ?;");
  const article = query.get(props.parameters.articleId);
  
  return (
    <>
      <fieldset>
        <form class="edit-article-form" id="edit-article-form" hx-put={`/edit-article/${props.parameters.articleId}`} hx-target="#edit-article-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" value={`${article.article_title}`} />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" value={`${article.article_date}`} />
          <label for="title">Slug: </label>
          <input type="text" id="slug" name="slug" value={`${article.article_slug}`} />
          <label for="slug">Category: </label>
          <input type="text" id="category" name="category" value={`${article.article_category}`} />
          <label for="summary">Summary:</label>
          <textarea id="summary" name="summary" rows="10" cols="50">{article.article_summary}</textarea>
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50">{article.article_content}</textarea>
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </>
  );
};

export default EditArticleForm;