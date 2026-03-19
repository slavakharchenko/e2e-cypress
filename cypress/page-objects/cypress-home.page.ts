import { BasePage } from "./base.page";
import { LinkElement } from "../page-elements";

export class CypressHomePage extends BasePage {
  protected readonly url = "/";

  readonly companyLink = new LinkElement("[data-cy='dropdown-company']");

  navigateToCompany(): this {
    this.companyLink.click();
    return this;
  }
}
