// src/views/posts.tsx

// the posts view; displays the posts from the database

// dependencies
import { Database } from "bun:sqlite";

// interface to define a blog post type
interface Article {
  post_id: number;
  post_title: string;
  post_date: string;
  post_slug: string;
  post_summary: string;
  post_content: string;
}

// type declaration for the posts type accepted by RenderPosts
type Posts = JSX.Element | JSX.Element[] | Article | Article[];

// render the posts in article format
const RenderArticles = ({ posts }: { posts: Posts }) => {
  const mappedArticles: Posts = posts.map((post: Post) => (
    <article class="blog-article" key={post.post_id}>
      <h3>{post.post_title}</h3>
      <h4>{post.post_date}</h4>
      <p>{post.post_summary}</p>
      <a href="#">Do you want to know more?</a>
    </article>
  ));

  return (
    <>
      {mappedArticles}
    </>
  );
};

// retrieve the blog posts from the database and render them as individual articles
const ArticlesOverview = ( { database }: { database: any} ) => {
  const posts = database.query("SELECT * FROM posts;").all() as Article[];
  
  return (
    <>
      <section  class="blog-grid">
        <RenderArticles posts={posts} />
      </section>
    </>
  );
};

export default ArticlesOverview;
