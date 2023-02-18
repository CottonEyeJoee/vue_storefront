# Vue Storefront Code Challenge

<!-- preview screenshots -->

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

  - [x] Location

  - [x] Humidity

  - [x] Wind speed

  - [x] Sunrise

  - [x] Sunset

- [x] Unit toggle

  - [x] Reduced API calls (convert temperature & wind speed locally)

- [x] Locally cache data

- [x] Use Vue

## :fire: Additional Features

- [x] [Vite](https://vitejs.dev/) bundler

- [x] [pnpm](https://pnpm.io/) package manager

- [x] 100% Typescript

- [x] 100% composition API

- [ ] Design

- [ ] Semantic HTML

- [ ] Refresh timer

- [ ] Theme switch for dark and light mode

- [ ] Unit Tests

- [ ] Fully responsive design (set to mobile dimension for presentation)

- [ ] [Demo](https://cottoneyejoee.github.io/vue_storefront/) is deployed on github pages

## :toolbox: Tooling

| Package                                | Description                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `vue`                                  | A JavaScript framework for building user interfaces [(Github)](https://github.com/vuejs/core)                  |
| `[pinia, pinia-plugin-persistedstate]` | Adaptation of the flux state management for vue (successor of Vuex) [(Github)](https://github.com/vuejs/pinia) |
| `axios`                                | Promise based HTTP client [(Github)](https://github.com/axios/axios)                                           |
| `dayjs`                                | Minimalist time & date library [(Github)](https://github.com/iamkun/dayjs)                                     |
| `vite`                                 | Build tool based on [esbuild](https://esbuild.github.io/) [(GitHub)](https://github.com/vitejs/vite)           |
| `[typescript, vue-tsc]`                | Type safe superset for Javascript [(Github)](hhttps://github.com/microsoft/TypeScript)                         |
| `sass`                                 | Popular CSS preprocessor [(Github)](https://github.com/sass/sass)                                              |

## :magic_wand: Setup

1. Open the terminal in the root directory & execute `pnpm i` (`npm i`)

1. Create an `.env.local' file in the root directory and add the following variables (make sure to save the file)

   ```env
   VITE_API_KEY={websocket-endpoint}
   VITE_API_BASE_URL={websocket-token}
   ```

1. In the terminal execute the command `pnpm run dev` (`npm run dev`) in the root directory

<!-- ## :construction: TODO

-  -->

## :lady_beetle: Known Bugs

- GitHub Actions deployment completes but the application throws an **404 error** when leading `main.ts` [(demo link)](https://cottoneyejoee.github.io/vue_storefront/)

## :scroll: Scripts

### `pnpm i`

Installs the project's dependencies specifies in package.json.

### `pnpm run dev`

This script runs application in development mode

<!-- ### `pnpm test`
This script runs vitest watcher-->

### `pnpm build`

Creates an optimized bundle ready to be deployed.
