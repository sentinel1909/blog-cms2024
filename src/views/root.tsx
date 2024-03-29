// src/components/root.tsx

// this is the root component, it renders the overall structure for each page
// it accepts a content prop, which is a sub-component which renders specific
// page content wrapped in a <main> tag.

// dependencies
import Header from "../components/header";
import NavBar from "../components/navbar";
import Content from "../components/content";
import Footer from "../components/footer";

const Root = (props: any) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="public/blog_logo.png" />
        <link rel="stylesheet" href="/public/styles.css" />
        <title>Blog CMS 2024</title>
      </head>
      <body>
        <Header />
        <NavBar />
        <Content content={props.content} />
        <Footer />
        <script src="/public/htmx.min.js"></script>
      </body>
    </html>
  );
};

export default Root;
