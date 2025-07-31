# Quotes App

This is a Next.js project for displaying and managing quotes. It allows users to view random quotes, search for quotes by various criteria, and manage (create, edit, delete) quotes through an interactive interface.

## Getting Started

### Running the Development Server

To run the app locally, first, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

This will start the app at [http://localhost:4000](http://localhost:4000).

You can also use other package managers:

```bash
# With yarn
yarn dev

# With pnpm
pnpm dev

# With bun
bun dev
```

The app will automatically reload when you make changes to the code. Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

### Running Tests

To run unit tests for the app, use the following command:

```bash
npm test
```

To run tests in watch mode, use:

```bash
npm run test:watch
```

## Project Structure

Here’s an overview of the project’s file and folder structure:

```text
app
├── _components        # Shared components like buttons and forms
├── _config            # Configuration files, including API endpoints
├── _utils             # Utility functions for fetching data and helper functions
└── (routes)           # Dynamic routes for handling different pages
    ├── quotes         # Routes related to managing quotes
    │   ├── [id]       # Routes related to single quote
    │   │   └── edit   # Route for editing single quote
    │   └── create     # Route for creating a single quote
    ├── search         # Route related to searching for quotes
    ├── fonts          # Custom font files
    ├── favicon.ico    # App favicon
    ├── globals.css    # Global CSS styles
    ├── layout.js      # Main layout component
    └── page.js        # Page for displaying random quotes
```

### Quotes Functionality

- **Random Quotes**: View random quotes from the API.
- **Search Quotes**: Search quotes by text, author, or category.
- **Create/Edit/Delete Quotes**: Allows users to add new quotes, edit existing quotes, or delete quotes.

## API Endpoints

The app interacts with the following backend API endpoints:

- GET **`/random`**: Fetches random quotes.
- GET **`/quotes`**: Fetches and searches for quotes (e.g., by text, author, category).
- POST **`/quotes`**: Creates a new quote.
- GET **`/quotes/:id`**: Fetches a specific quote by its ID.
- PATCH **`/quotes/:id`**: Edits an existing quote.
- DELETE **`/quotes/:id`**: Deletes a quote.

## Deployment

You can deploy the app using the [Vercel platform](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app-readme) (from the creators of Next.js). Here’s how to do it:

1. Install the Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy the app:

```bash
vercel
```

Follow the prompts to complete your deployment.

## Learn More

To learn more about Next.js, you can check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about the features and API.
- [Learn Next.js](https://nextjs.org/learn) - A step-by-step interactive tutorial.
