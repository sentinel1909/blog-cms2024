// src/views/new_post.tsx

// the new posts view; displays a form for entering a new blog post

const CreateArticleForm = () => {
  return (
    <>
      <fieldset>
        <form class="create-article-form" id="create-article-form" hx-post="/create-article" hx-target="#create-article-form" hx-swap="outerHTML">
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
      </fieldset>
    </>
  );
};

export default CreateArticleForm;
