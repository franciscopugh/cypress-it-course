const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5500/public",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
