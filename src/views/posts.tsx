// src/views/posts.tsx

// the posts view; displays the posts from the database

// dependencies
import { Database } from "bun:sqlite";

// interface to define a blog post type
interface Post {
  post_id: number;
  post_title: string;
  post_date: string;
  post_slug: string;
  post_content: string;
}

// type declaration for the posts type accepted by RenderPosts
type Posts = JSX.Element | JSX.Element[] | Post | Post[];

// render the posts in article format
const RenderPosts = ({ posts }: { posts: Posts }) => {
  const mappedPosts: Posts = posts.map((post: Post) => (
    <article key={post.post_id}>
      <h3>{post.post_title}</h3>
      <h4>{post.post_date}</h4>
      <p>{post.post_content}</p>
    </article>
  ));

  return (
    <>
      <h2>Blog Posts Summary</h2>
      {mappedPosts}
    </>
  );
};

// retrieve the blog posts from the database and render them as individual articles
const PostsOverview = () => {
  const db = new Database("./src/blog.db");
  const posts = db.query("SELECT * FROM posts;").all() as Post[];
  db.close();

  return (
    <>
      <section>
        <RenderPosts posts={posts} />
      </section>
    </>
  );
};

export default PostsOverview;
