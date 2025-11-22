# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

All commands are run from the project root.

- `npm install` – Install dependencies.
- `npm run dev` – Start the local dev server (Astro) at `http://localhost:4321`.
- `npm run build` – Build the production site into the `dist/` directory.
- `npm run preview` – Preview the built site locally.
- `npm run astro check` – Run Astro’s built-in diagnostics/type checking.
- `npm run astro -- --help` – Show help for the Astro CLI and available subcommands.

Testing: there is currently no test runner or `test` script configured in `package.json`, so there is no standard command for running a single test yet.

## Architecture overview

### Framework and configuration

- This is an Astro 5 project using the “basics” starter as a base, customized into a simple ecommerce demo.
- `astro.config.mjs` is effectively the default Astro config.
- `tsconfig.json` extends `astro/tsconfigs/strict`, enabling strict TypeScript checking across `.ts` and `.astro` files.
- The only runtime dependency is `astro`; `autoprefixer`, `postcss`, and `tailwindcss` are present as dev dependencies but styles are currently authored via component-scoped `<style>` blocks rather than Tailwind utility classes.

### Layout and page structure

- Global HTML shell and layout:
  - `src/layouts/BaseLayout.astro` defines the main HTML document structure, including `<html lang="es">`, global `<body>` styles, header, footer, and a `.container` layout. It receives a `title` prop and renders the page content via `<slot />`.
- Main page:
  - `src/pages/index.astro` is the primary ecommerce landing page. It wraps its content in `BaseLayout`, renders a hero section with Spanish copy, and then a “Productos destacados” section which embeds the product listing.
- Legacy starter layout:
  - `src/layouts/Layout.astro` is the original Astro starter layout (English, minimal chrome). It is currently separate from `BaseLayout` and not used by `index.astro`.

### Data and domain model

- `src/data/products.ts` defines the core domain type for the demo store:
  - `Product` type with `id`, `name`, `description`, `price`, `image`, and `inStock` fields.
  - `products` – an in-memory array of `Product` objects representing the catalog. Images are expected under `public/products/...`.
- There is no persistence or external API; all product data is static and imported at build time.

### UI components

- Product list and cards:
  - `src/components/ProductList.astro` imports `products` and maps them to `ProductCard` instances, forming the grid of featured products.
  - `src/components/ProductCard.astro` is a purely presentational card component. It:
    - Accepts a `product: Product` prop (and an optional `onAddToCart` callback that is currently unused).
    - Renders the product image, name, description, price, and a button whose label and `disabled` state depend on `product.inStock`.
- Cart summary:
  - `src/components/Cart.astro` is a presentational cart summary component that expects an `items: CartItem[]` prop (where each `CartItem` wraps a `Product` with a `quantity`).
  - It derives a `total` from the items and renders a simple list plus a total row.
  - There is currently no shared cart state or wiring from the main page into this component; it is designed to be embedded wherever cart data is available.

### Starter remnants

- `src/components/Welcome.astro` and related assets under `src/assets/` are from the original Astro starter template. They are currently independent of the ecommerce layout and main page and can be treated as sample/legacy content.

## How pieces fit together

- The main user flow is entirely static and server-rendered:
  - `index.astro` (page) → `BaseLayout.astro` (layout shell) → `ProductList.astro` (section) → `ProductCard.astro` (cards) → static `products` data.
- There is no client-side state management, routing beyond the index page, or dynamic data fetching at this point; the site is a static ecommerce showcase built from in-repo TypeScript data and Astro components.
