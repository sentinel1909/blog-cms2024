// src/views/post.tsx

// a view which displays a single post

// dependencies
import showdown from 'showdown';

const RenderArticle = (props: any) => {
  const slug = props.parameters.articleSlug;
  const query = props.database.query("SELECT article_content FROM articles WHERE article_slug = ?;");
  const article = query.get(slug);
  const converter = new showdown.Converter();
  const content = converter.makeHtml(article.article_content) ;
  if (!article) {
    return (
      <>
        <section>
          <article>
            <p>Unable to retrieve and render the article content.</p>
          </article>
        </section>
      </>
    )
  }
      
  return (
    <>
      <section>
        <article class="article-container">
          {content}
        </article>
      </section>    
    </>
  );
};

export default RenderArticle;