import { BasePage } from "./base.page";
import { ButtonElement, InputElement, SearchResultElement } from "../page-elements";

export class DocsSearchPage extends BasePage {
  protected readonly url = "https://docs.cypress.io";

  readonly searchButton = new ButtonElement("nav button:contains('Search')");
  readonly searchModal = new ButtonElement(".DocSearch-Modal");
  readonly searchInput = new InputElement("#docsearch-input");
  readonly searchResultsList = new ButtonElement(".DocSearch-Dropdown");
  readonly searchHitsSection = new SearchResultElement(".DocSearch-Hits");

  visit(): this {
    cy.visit(this.url);
    return this;
  }

  dismissCookieBanner(): this {
    cy.get("body").then(($body) => {
      if ($body.find(".osano-cm-denyAll:visible").length > 0) {
        cy.get(".osano-cm-denyAll").click();
      }
    });
    return this;
  }

  openSearch(): this {
    this.searchButton.click();
    this.searchModal.shouldBeVisible();
    return this;
  }

  searchFor(query: string): this {
    this.openSearch();
    this.searchInput.type(query);
    this.searchResultsList.shouldBeVisible();
    return this;
  }
}
