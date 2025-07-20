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

  constructor(page: Page) {
      this.page = page;
      this.title = page.getByText('Вход');
      this.registerLink = page.getByText('Еще не зарегистрированы ?');
      this.emailInput = page.getByRole('textbox', { name: 'Почта' });
      this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
      this.submitButton = page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button');
      this.emailError = page.locator('div').filter({ hasText: /^ПочтаПочтаЗаполните поле$/ }).getByRole('paragraph');
      this.emailInvalid = page.getByText('Неверный формат почты');
      this.passwordError = page.locator('div').filter({ hasText: /^ПарольПарольЗаполните поле$/ }).getByRole('paragraph');
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

