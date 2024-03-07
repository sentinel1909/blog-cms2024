// src/views/post.tsx

// a view which displays a single post

// dependencies
const showdown = require('showdown');

const RenderArticle = (props: any) => {
  const slug = props.parameters.articleSlug;
  const query = props.database.query("SELECT article_content FROM articles WHERE article_slug = ?");
  const article = query.get(slug);
  const converter = new showdown.Converter();
  const convertedContent = converter.makeHtml(article.article_content) ;
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
      {convertedContent}    
    </>
  );
};

export default RenderArticle;