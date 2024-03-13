// src/index.tsx

// dependencies
import { Database } from "bun:sqlite";
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import Root from "./views/root";
import Home from "./views/home";
import RenderArticle from "./views/article";
import ArticlesOverview from "./views/articles";
import CreateArticleForm from "./components/create_article_form";
import CreateArticle from "./routes/create_article";
import EditArticle from "./routes/edit_article";
import EditArticleForm from "./components/edit_article_form";
import DeleteArticle from "./routes/delete_article";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", new Database("./blog.db"))
  .get("/", ({ db }) => <Root content={<Home database={db} />} />)
  .get("/article/:articleDate/:articleSlug", ({ db, params: dateandSlug }) => 
    <Root content={<RenderArticle database={db} parameters={dateandSlug} />} />
  )
  .get("/articles", ({ db }) => (
    <Root content={<ArticlesOverview database={db} />} />
  ))
  .get("/new-article", () => <Root content={<CreateArticleForm />} />)
  .post("/create-article", ({ db, body }) => CreateArticle(db, body), {
    body: t.Object({
      title: t.String(),
      date: t.String(),
      slug: t.String(),
      category: t.String(),
      summary: t.String(),
      content: t.String(),
    }),
  })
  .get("/edit-article/:articleId", ({ db, params: articleId }) => <EditArticleForm database={db} parameters={articleId} />)
  .put("/edit-article/:articleId", ({ db, body, params: articleId }) => EditArticle(db, body, articleId), {
    body: t.Object({
      title: t.String(),
      date: t.String(),
      slug: t.String(),
      category: t.String(),
      summary: t.String(),
      content: t.String(),
    }),
  })
  .delete("/delete-article/:articleId", ({ db, params: articleId }) => DeleteArticle(db, articleId))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
