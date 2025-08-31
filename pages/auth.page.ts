import { Locator, Page, expect } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly title: Locator;
  readonly registerLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly emailError: Locator;
  readonly emailInvalid: Locator;
  readonly passwordError: Locator;

  constructor(page: Page, locators: any) { // 🔹 Принимаем локаторы из фикстур
    this.page = page;
    this.title = page.locator(locators.title);
    this.registerLink = page.locator(locators.registerLink);
    this.emailInput = page.getByRole(locators.emailInput.role, { name: locators.emailInput.name });
    this.passwordInput = page.getByRole(locators.passwordInput.role, { name: locators.passwordInput.name });
    this.submitButton = page.getByRole(locators.submitButton.role, { name: locators.submitButton.name }).nth(locators.submitButton.nth);
    this.emailError = page.locator(locators.emailError.selector).nth(locators.emailError.nth);
    this.passwordError = page.locator(locators.passwordError.selector).nth(locators.passwordError.nth);
    this.emailInvalid = page.locator(locators.emailInvalid);
    
  }

  async navigateToRegistration() {
      await this.registerLink.click();
  }

  async login(email: string, password: string) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
  }

  async verifyEmptyFormErrors() {
    await expect(this.emailError).toBeVisible();
    await expect(this.passwordError).toBeVisible();
  }
  async verifyEmptyFormErrorsInvalid() {
    await expect(this.emailInvalid).toBeVisible();
  }
}

