import { defineConfig } from "cypress";

export default defineConfig({
  // Configuración de Cypress para componentes
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  // Configuración de Cypress para pruebas E2E
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
