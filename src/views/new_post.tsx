// src/views/new_post.tsx

// the new posts view; displays a form for entering a new blog post

const NewPostForm = () => {
  return (
    <>
      <fieldset id="new-post-form">
        <form class="new-post-form" hx-post="/submit-new-post" hx-target="#new-post-form" hx-swap="outerHTML">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
      <span id="result"></span>
    </>
  );
};

export default NewPostForm;
