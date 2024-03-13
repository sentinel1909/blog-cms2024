# Blog CMS 2024

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A bare bones blog CMS created with Bun/ElysiaJS/SQLite/HTMX.

## Installation

Install Bun by following the instructions on the [offical Bun site](https://bun.sh)

## Usage

The is a barebones blog CMS. It will:

- display a featured article on the Home page
- provide a summary of all the posts in the database, in a card format
    - edit and delete capability for individual articles
- add new articles

### Development Server

Start a development server with:

```bash
bun run dev
```

### Production Build

To create a production build:

```bash
bun run build
```

## Features

- ElysiaJS for app routes
- SQLite for data storage
- HTMX for interactivity and page functions
- Markdown content rendered by Showdwon

## Dependencies

- Bun
- ElysiaJS
- SQLite
- HTMX
- Showdown

## Author

- Jeffery D. Mitchell

## License

This project is open source and available under the MIT License.