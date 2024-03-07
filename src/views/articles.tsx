// src/views/posts.tsx

// the posts view; displays the posts from the database

// interface to define a blog post type
interface Article {
  article_id: number;
  article_title: string;
  article_date: string;
  article_slug: string;
  article_summary: string;
  article_content: string;
}

// type declaration for the posts type accepted by RenderPosts
type Articles = JSX.Element | JSX.Element[] | Article | Article[];

// render the posts in article format
const RenderArticles = ({ articles }: { articles: Article[] }) => {
  const mappedArticles: Articles = articles.map((article: Article) => (
    <article class="blog-article" key={article.article_id}>
      <h3>{article.article_title}</h3>
      <h4>{article.article_date}</h4>
      <p>{article.article_summary}</p>
      <a href={`/article/${article.article_date}/${article.article_slug}`}>Do you want to read more?</a>
    </article>
  ));

  return (
    <>
      {mappedArticles}
    </>
  );
};

// retrieve the blog posts from the database and render them as individual articles
const ArticlesOverview = ( props: any ) => {
  const query = props.database.query("SELECT * FROM articles;");
  const articles = query.all();
  
  if (!articles) {
    return (
      <>
        <section>
          <article>
            <h3>Error:</h3>
            <p>Unable to retrieve and render article summary.</p>
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
