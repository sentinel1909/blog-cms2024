// src/views/post.tsx

// a view which displays a single post

const RenderArticle = (props: any) => {
  const slug = props.parameters.articleSlug;
  const query = props.database.query("SELECT article_content FROM articles WHERE article_slug = ?");
  const article = query.get(slug);
  if (!article) {
    return (
      <>
        <section>
          <article>
            <h3>Error:</h3>
            <p>Unable to retrieve and render the article content.</p>
          </article>
        </section>
      </>
    )
  }
      
  return (
    <>
      <section>
        <article>
          <p>{article.article_content}</p>
        </article>
      </section>    
    </>
  );
};

export default RenderArticle;