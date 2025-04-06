# CineJiffy

Movie catalog web app using Vue 3, TypeScript, and Tailwind CSS.

## Setup

1. Get TMDb API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
2. Copy `.env.example` to `.env.local` and add your API key
3. Install dependencies: `npm install`

## Development

```sh
npm run dev        # Start dev server
npm run build      # Build for production
npm run test:unit  # Run unit tests
npm run test:e2e   # Run e2e tests
```

## Features

- Movie search and filters (genre, year, rating)
- Favorites list with local storage
- Movie details with related films
- Mobile-responsive design

## Tech Stack

- Vue 3 + TypeScript
- Tailwind CSS
- Vitest + Cypress
- TMDb API

## TODO

- Fix pagination items per page
- Improve year range filter
- Add missing unit tests