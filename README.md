# Milen

[Next.js](https://nextjs.org) app for the Milen med Mörsell run (formerly Milen med Musikmäster).

- UI with [Chakra UI](https://chakra-ui.com) and animations with [Framer Motion](https://www.framer.com/motion/)
- Linting with [ESLint](https://eslint.org/) and formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)
- Deployment on [Azure Static Web App](https://azure.microsoft.com/en-us/services/app-service/static/) using [GitHub Actions](https://github.com/features/actions)

## How to use

### Software prerequisites

You need the following software to run this application

- [Node.js](https://nodejs.org/en/download/)
- Optional: [Yarn package manager](https://classic.yarnpkg.com/en/docs/install)

### Step 1: Clone repository

Open a terminal window and run the following

```bash
git clone https://github.com/vmorsell/milen-run
```

Open the cloned directory

```bash
cd milen-run
```

### Step 2: Install dependencies

Install dependencies

```bash
yarn
# or
npm install
```

### Step 3: Create a free Contentful account

Go to [contentful.com](https://contentful.com) and follow the instructions.

### Step 4: Environment variables

Rename `.env.local.example` to `.env.local` and replace the placeholders
with your Contentful API keys.

You can find your space ID on Contentful by navigating to `Settings > Space settings > General settings`

API keys generator can be found by navigating to `Settings > Space settings > API keys`

### Step 5: Install Contenful CLI

```bash
yarn global add contentful-cli
# or
npm install -g contentful-cli
# or
brew install contentful-cli
```

### Step 6: Import example data

Log in to Contentful

```bash
contentful login
```

Select your Contentful space

```bash
contentful space use
```

Import example data

```bash
contentful space import --content-file example/contentful_data.json
```

### Step 7: Start development server

```bash
yarn dev
# or
npm dev
```

## Type generation

This updates the local types to reflect your Contentful models. Run this every time you've changed something at Contentful.

```bash
yarn gen-types
# or
npm gen-types
```
