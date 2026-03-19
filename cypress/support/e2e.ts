import "./commands";

Cypress.on("uncaught:exception", (err) => {
  console.log(`[uncaught:exception] ${err.message}`);
  return false;
});
