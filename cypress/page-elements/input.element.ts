import { BaseElement } from "./base.element";

export class InputElement extends BaseElement {
  type(value: string, options?: Partial<Cypress.TypeOptions>): this {
    this.el.clear(options).type(value, options);
    return this;
  }

  clear(): this {
    this.el.clear();
    return this;
  }

  submit(options?: Partial<Cypress.TypeOptions>): this {
    this.el.type("{enter}", options);
    return this;
  }

  shouldHaveValue(value: string): this {
    this.el.should("have.value", value);
    return this;
  }
}
