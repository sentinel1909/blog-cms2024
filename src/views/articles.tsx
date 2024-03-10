// src/views/posts.tsx

// the posts view; displays the posts from the database

// interface to define a blog post type
interface Article {
  article_id: number;
  article_title: string;
  article_date: string;
  article_slug: string;
  article_category: string;
  article_summary: string;
  article_content: string;
}

// type declaration for the posts type accepted by RenderPosts
type Articles = JSX.Element | JSX.Element[] | Article | Article[];

// render the posts in article format
const RenderArticles = ({ articles }: { articles: Article[] }) => {
  const mappedArticles: Articles = articles.map((article: Article) => (
    <article class="blog-article" id="article-id" key={article.article_id}>
      <h3>{article.article_title}</h3>
      <h4>{article.article_date}</h4>
      <p>Category: {article.article_category}</p>
      <p>{article.article_summary}</p>
      <a href={`/article/${article.article_date}/${article.article_slug}`}>
        Do you want to read more?
      </a>
      <table>
        <tr>
          <td>
            <button hx-delete={`/delete-article/${article.article_id}`} hx-target="#article-id" hx-swap="outerHTML">Delete</button>
          </td>
          <td>
            <button>Edit</button>
          </td>
        </tr>
      </table>
    </article>
  ));

  return <>{mappedArticles}</>;
};

// retrieve the blog posts from the database and render them as individual articles
const ArticlesOverview = (props: any) => {
  const query = props.database.query("SELECT * FROM articles;");
  const articles = query.all();

  if (articles.length === 0) {
    return (
      <>
        <section>
          <article>
            <h3>No Articles</h3>
            <p>There are no articles in the database.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <section class="blog-grid">
        <RenderArticles articles={articles} />
      </section>
    </>
  );
};

export default ArticlesOverview;
