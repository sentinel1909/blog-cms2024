// src/index.tsx

// dependencies
import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import Root from "./views/root";
import Home from "./views/home";
import PostsOverview from "./views/posts";
import NewPostForm from "./views/new_post";

// app instance with configuration and routes
const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => <Root content={<Home />} />)
  .get("/posts", () => <Root content={<PostsOverview />} />)
  .get("/admin", () => <Root content={<NewPostForm />} />)
  .listen(3000);

// log a console message that the app is running and listening for incoming requests
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
