# Vue Storefront Code Challenge

![Preview of the weather widget](/screenshot/preview.png)

<!-- ## [Demo link](https://cottoneyejoee.github.io/vue_storefront/) -->

<!-- ## :pushpin: Foreword
Vue 3 + TypeScript + Vite + Pinia
focus on new technologies and coding patterns-->

## :clipboard: Requirements

- [x] Show weather data based on user location

  - [x] Temperature

    - [x] Celsius

    - [x] Fahrenheit

  - [x] Weather description

  - [x] Location & Country

  - [x] Humidity

  - [x] Wind speed

    - [x] km/h

    - [x] mph

  - [x] Sunrise

  - [x] Sunset

- [x] Unit toggle

  - [x] Reduced API calls (convert temperature & wind speed locally)

- [x] Cache data locally

## :fire: Additional Features

- [x] [Vite](https://vitejs.dev/) bundler

- [x] [pnpm](https://pnpm.io/) package manager

- [x] Type save with Typescript

- [x] Vue3 (100% composition API)

- [x] Design

- [x] Semantic HTML

- [x] Accessible HTML

<!-- - [ ] Refresh timer -->

<!-- - [ ] Theme switch for dark and light mode -->

<!-- - [ ] Unit Tests -->

<!-- - [ ] Fully responsive design (set to mobile dimension for presentation) -->

<!-- - [ ] [Demo](https://cottoneyejoee.github.io/vue_storefront/) is deployed on github pages -->

## :toolbox: Tooling

| Package      | Description                                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vue`        | JavaScript framework for building user interfaces [(Github)](https://github.com/vuejs/core)                                                          |
| `pinia`      | Lightweight, intuitive, TypeScript-first state management system for Vue [(Github)](https://github.com/vuejs/pinia)                                  |
| `axios`      | Promise based HTTP client [(Github)](https://github.com/axios/axios)                                                                                 |
| `dayjs`      | Minimalist JavaScript date manipulation library [(Github)](https://github.com/iamkun/dayjs)                                                          |
| `vite`       | Fast, efficient build tool and development server for modern web projects [(GitHub)](https://github.com/vitejs/vite)                                 |
| `typescript` | Superset of JavaScript with optional static typing and enhanced maintainability and scalability [(Github)](hhttps://github.com/microsoft/TypeScript) |
| `sass`       | CSS preprocessor that extends the capabilities of traditional CSS [(Github)](https://github.com/sass/sass)                                           |

## :magic_wand: Setup

1. Open the terminal in the root directory & execute `pnpm i` (`npm i`)

1. Create an `.env.local' file in the root directory and add the following variables (make sure to save the file)

   ```env
   VITE_API_KEY={api-key}
   VITE_API_BASE_URL={base-url}
   ```

1. In the terminal execute the command `pnpm run dev` (`npm run dev`) in the root directory

<!-- ## :construction: TODO

-  -->

## :lady_beetle: Known Bugs

- Deployed application throws an **404 error** when loading `main.ts` resulting in empty page [(demo link)](https://cottoneyejoee.github.io/vue_storefront/)

## :scroll: Scripts

### `pnpm i`

Installs the project's dependencies specifies in package.json.

### `pnpm run dev`

This script runs application in development mode

<!-- ### `pnpm test`
This script runs vitest watcher-->

### `pnpm build`

Creates an optimized bundle ready to be deployed.
