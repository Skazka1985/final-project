import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page, locators: any) {
        this.page = page;
        this.loginButton = page.locator(locators.loginButton);
    }

    async navigate() {
        await this.page.goto('/');
    }

    async openLoginForm() {
        await this.loginButton.click();
    }

    async navigateToRegistration() {
        await this.openLoginForm();
        // Ждем появления ссылки на регистрацию
        await this.page.getByText('Еще не зарегистрированы?').click();
      }
}