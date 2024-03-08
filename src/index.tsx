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
import CreateArticleForm from "./views/new_article";
import CreateArticle from "./routes/create_article";
import EditArticle from "./routes/edit_article";
import DeleteArticle from "./routes/delete_article";

// app instance with configuration and routes
const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", new Database("./src/blog.db"))
  .get("/", () => <Root content={<Home />} />)
  .get("/article/:articleDate/:articleSlug", ({ db, params: dateandSlug }) => (
    <Root content={<RenderArticle database={db} parameters={dateandSlug} />} />
  ))
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
  .put("/edit-article", ({ db }) => EditArticle(db))
  .delete("/delete-article", ({ db }) => DeleteArticle(db))
  .listen(3000);

// log a console message that the app is running and listening for incoming requests
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
