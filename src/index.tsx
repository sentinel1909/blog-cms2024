// src/index.tsx

// dependencies
import { Database } from "bun:sqlite";
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import Root from "./views/root";
import Home from "./views/home";
import PostsOverview from "./views/posts";
import NewPostForm from "./views/new_post";
import SubmitNewPost from "./queries/submit_new_post";

// app instance with configuration and routes
const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", new Database("./src/blog.db"))
  .get("/", () => <Root content={<Home />} />)
  .get("/posts", () => <Root content={<PostsOverview />} />)
  .get("/admin", () => <Root content={<NewPostForm />} />)
  .post("/submit-new-post", ({ db, body }) => SubmitNewPost(db, body), {
    body: t.Object({
      title: t.String(),
      date: t.String(),
      content: t.String(),
    }),
  })
  .listen(3000);

// log a console message that the app is running and listening for incoming requests
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
