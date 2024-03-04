// src/views/new_post.tsx

// the new posts view; displays a form for entering a new blog post

const NewPostForm = () => {
  return (
    <>
      <fieldset>
        <h2>Enter a new blog post</h2>
        <form class="new-post-form" action="/submit-post" method="POST">
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" />
          <label for="date">Date: </label>
          <input type="date" id="date" name="date" />
          <label for="content">Content:</label>
          <textarea id="content" name="content" rows="10" cols="50"></textarea>
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </>
  );
};

export default NewPostForm;
