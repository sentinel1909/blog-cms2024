// src/views/post.tsx

// a view which displays a single post

const RenderArticle = (props: any) => {
  const query = props.database.query("SELECT article_content FROM articles WHERE article_slug = ?", [props.parameters.articleSlug]);
  const article = query.get();
      
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