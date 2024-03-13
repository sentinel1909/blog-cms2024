// src/views/home.tsx

// the home view; displays the landing page for the site

// dependencies
const showdown = require('showdown');

const Home = (props: any) => {  
  const query = props.database.query("SELECT article_content FROM ARTICLES WHERE article_id = 1");
  const article = query.get();
  if (!article) {
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
  
  const converter = new showdown.Converter();
  const content = converter.makeHtml(article.article_content);

  return (
    <>
      <section>
        <h2>Highlight Article</h2>
        <article class="article-container">
          {content}
        </article> 
      </section>   
    </>
  );
};

export default Home;
