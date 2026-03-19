import { BaseElement } from "./base.element";

export class LinkElement extends BaseElement {
  shouldHaveHref(expectedHref: string): this {
    this.el.should("have.attr", "href").and("include", expectedHref);
    return this;
  }

  click(): this {
    this.el.click();
    return this;
  }
}
