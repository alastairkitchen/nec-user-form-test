## Getting Started

First, install node modiles

```bash
npm i
```

Then, start the development server

```bash
npm run dev
```

## Architecture

Next JS, Axios, React Query, React Hook Forms, Jest + React Testing Library.

I used react query to handle data fetching, as the app scales i would leverage the caching layer in react query to only fetch the data when needed.
React hook forms is used to handle form submissions and validation, react hook forms has excellent built in validation that has been implemented on the add user form.
The API client in `api/alient` is built on top of Axios and implements a centralized configuration pattern that serves as the single source of truth for all HTTP communications in the application.
