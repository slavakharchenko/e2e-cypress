import { BaseElement } from "./base.element";

export class ButtonElement extends BaseElement {
  click(): this {
    this.el.click();
    return this;
  }

  shouldBeDisabled(): this {
    this.el.should("be.disabled");
    return this;
  }

  shouldBeEnabled(): this {
    this.el.should("be.enabled");
    return this;
  }
}
