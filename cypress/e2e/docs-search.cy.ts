import { DocsSearchPage } from "../page-objects";

describe("Cypress Docs Search Suggester", () => {
  const docsSearchPage = new DocsSearchPage();

  beforeEach(() => {
    docsSearchPage.visit();
    docsSearchPage.dismissCookieBanner();
  });

  it("should search for 'blur' and find 'Blur Events' in the suggester", () => {
    docsSearchPage.searchFor("blur");
    docsSearchPage.searchHitsSection.shouldContainTitle("Blur Events");
  });
});
