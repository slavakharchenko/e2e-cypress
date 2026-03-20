export abstract class BaseApi {
  protected get apiUrl(): string {
    return Cypress.expose("apiUrl");
  }

  protected request<T>(
    method: Cypress.HttpMethod,
    path: string,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return cy.request({
      method,
      url: `${this.apiUrl}${path}`,
      ...options,
    });
  }

  protected get<T>(
    path: string,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return this.request<T>("GET", path, options);
  }

  protected post<T>(
    path: string,
    body?: Cypress.RequestBody,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return this.request<T>("POST", path, { body, ...options });
  }

  protected put<T>(
    path: string,
    body?: Cypress.RequestBody,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return this.request<T>("PUT", path, { body, ...options });
  }

  protected patch<T>(
    path: string,
    body?: Cypress.RequestBody,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return this.request<T>("PATCH", path, { body, ...options });
  }

  protected delete<T>(
    path: string,
    options?: Partial<Cypress.RequestOptions>,
  ): Cypress.Chainable<Cypress.Response<T>> {
    return this.request<T>("DELETE", path, options);
  }
}
