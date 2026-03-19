export abstract class BasePage {
  protected abstract readonly url: string;

  visit(): this {
    cy.visit(this.url);
    return this;
  }

  shouldBeOpen(): this {
    cy.url().should("include", this.url);
    return this;
  }
}
