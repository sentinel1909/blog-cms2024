// src/index.tsx

// dependencies
import { Database } from "bun:sqlite";
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import Root from "./views/root";
import Home from "./views/home";
import ArticlesOverview from "./views/articles";
import NewArticleForm from "./views/new_article";
import SubmitNewArticle from "./routes/submit_new_article";

// app instance with configuration and routes
const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", new Database("./src/blog.db"))
  .get("/", () => <Root content={<Home />} />)
  .get("/articles", ({ db }) => <Root content={<ArticlesOverview database={db} />} />)
  .get("/new-article", () => <Root content={<NewArticleForm />} />)
  .post("/submit-new-article", ({ db, body }) => SubmitNewArticle(db, body), {
    body: t.Object({
      title: t.String(),
      date: t.String(),
      slug: t.String(),
      summary: t.String(),
      content: t.String(),
    }),
  })
  .listen(3000);

// log a console message that the app is running and listening for incoming requests
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
