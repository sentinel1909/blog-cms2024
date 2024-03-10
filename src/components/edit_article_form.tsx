// src/views/edit_article.tsx

// the edit article view; displays a form to choose an article to edit

const EditArticleForm = () => {
  return (
    <>
      <fieldset>
        <form class="edit-article-form" id="edit-article-form" hx-post="/edit-article" hx-target="#edit-article-form" hx-swap="outerHTML">
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </>
  );
};

export default EditArticleForm;