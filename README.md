# Milen

[Next.js](https://nextjs.org) app for the Milen med Mörsell run (formerly Milen med Musikmäster).

- UI with [Chakra UI](https://chakra-ui.com) and animations with [Framer Motion](https://www.framer.com/motion/)
- Linting with [ESLint](https://eslint.org/) and formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)
- Deployment on [Azure Static Web App](https://azure.microsoft.com/en-us/services/app-service/static/) using [GitHub Actions](https://github.com/features/actions)

## How to use

### Step 1: Clone package

```bash
git clone https://github.com/vmorsell/milen-med-morsell
```

### Step 2: Create an account and a space on Contentful

Go to [contentful.com](https://contentful.com)

### Step 3: Environment variables

Rename `.env.local.example` to `.env.local` and replace the placeholders
with your Contentful API keys.

### Step 3: Generate Contentful types

```bash
yarn gen-types
# or
npm gen-types
```

### Step 4: Start development server

```bash
yarn dev
# or
npm dev
```
