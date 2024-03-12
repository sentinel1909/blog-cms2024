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

const RenderArticles = ({ articles }: { articles: Article[] }) => {
  const mappedArticles: Articles = articles.map((article: Article) => (
    <article class="blog-article" id={`blog-article-${article.article_id}`}>
      <h3>{article.article_title}</h3>
      <h4>{article.article_date}</h4>
      <p>Category: {article.article_category}</p>
      <p>{article.article_summary}</p>
      <a href={`/article/${article.article_date}/${article.article_slug}`}>
        Do you want to know more?
      </a>
      <table>
        <tr>
          <td>
            <button hx-delete={`/delete-article/${article.article_id}`} hx-target={`#blog-article-${article.article_id}`} hx-swap="innerHTML">Delete</button>
          </td>
          <td>
            <button hx-get={`/edit-article/${article.article_id}`} hx-target="#blog-grid" hx-swap="outerHTML">Edit</button>
          </td>
        </tr>
      </table>
    </article>
  ));

  return <>{mappedArticles}</>;
};

const ArticlesOverview = (props: any) => {
  const query = props.database.query("SELECT * FROM articles;");
  const articles = query.all();

  if (articles.length === 0) {
    return (
      <>
        <section>
          <article>
            <p>There are no articles in the database.</p>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <section class="blog-grid" id="blog-grid">
        <RenderArticles articles={articles} />
      </section>
    </>
  );
};

export default ArticlesOverview;
