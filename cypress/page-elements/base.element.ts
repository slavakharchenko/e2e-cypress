export abstract class BaseElement {
  constructor(protected readonly selector: string) {}

  protected get el(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selector);
  }

  shouldBeVisible(): this {
    this.el.should("be.visible");
    return this;
  }

  shouldNotExist(): this {
    cy.get(this.selector).should("not.exist");
    return this;
  }

  shouldContainText(text: string): this {
    this.el.should("contain.text", text);
    return this;
  }
}
