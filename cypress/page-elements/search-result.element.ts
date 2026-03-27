import { BaseElement } from "./base.element";

export class SearchResultElement extends BaseElement {
  shouldContainTitle(text: string): this {
    this.el.find(".DocSearch-Hit-title").should("contain.text", text);
    return this;
  }
}
