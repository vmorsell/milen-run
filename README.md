# NextJS Typescript Boilerplate

Bootstrap a developer-friendly NextJS app configured with:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest)

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

```bash
brew install contentful-cli
# or
npm install -g contenful-cli
# or
yarn global add contentful-cli
```

Deploy it to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
