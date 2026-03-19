import { CypressHomePage } from "../page-objects";

describe("Cypress.io Navigation", () => {
  const homePage = new CypressHomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("should navigate to about-us page when clicking Company link", () => {
    homePage.navigateToCompany();
    cy.url().should("include", "/about-us");
  });
});
