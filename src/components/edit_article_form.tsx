// src/views/edit_article.tsx

// the edit article view; displays a form to edit the content of the selected article

const EditArticleForm = (props: any) => {
  
  const query = props.database.query("SELECT article_content FROM articles WHERE article_id = ?;");
  const article = query.get(props.parameters.articleId);
  
  return (
    <>
      <fieldset>
        <form class="edit-article-form" id="edit-article-form" hx-put={`/edit-article/${props.parameters.articleId}`} hx-target="#edit-article-form" hx-swap="outerHTML">
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50">{article.article_content}</textarea>
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </>
  );
};

export default EditArticleForm;