// src/views/new_post.tsx

// the new posts view; displays a form for entering a new blog post

const NewArticleForm = () => {
  return (
    <>
      <fieldset>
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
      </fieldset>
    </>
  );
};

export default NewArticleForm;
