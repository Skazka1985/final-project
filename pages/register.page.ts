import { Locator, Page, expect } from '@playwright/test';

export class RegisterPage {
  // локаторы регистрации
  readonly page: Page;
  readonly title: Locator;
  readonly loginLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;

  // отдельные локаторы для ошибок
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly phoneError: Locator;

  // отдельные локаторы для невалидных ошибок
  readonly emailInvalid: Locator;
  readonly passwordInvalid: Locator;
  readonly phoneInvalid: Locator;

  // локаторы для личного кабинета 
  // readonly PersonIcon : Locator;
  // readonly MyAds: Locator;
  // readonly Office: Locator;


  constructor(page: Page, locators: any) {
      this.page = page;
      this.title = page.locator(locators.title);
      this.loginLink = page.locator(locators.loginLink);

      // Поля формы
      this.emailInput = page.getByRole(locators.emailInput.role, { name: locators.emailInput.name });
      this.passwordInput = page.getByRole(locators.passwordInput.role, { name: locators.passwordInput.name });
      this.firstNameInput = page.getByRole(locators.firstNameInput.role, { name: locators.firstNameInput.name });
      this.lastNameInput = page.getByRole(locators.lastNameInput.role, { name: locators.lastNameInput.name });
      this.phoneInput = page.getByRole(locators.phoneInput.role, { name: locators.phoneInput.name });
      this.submitButton = page.locator(locators.submitButton);

      // Локаторы ошибок
      this.emailError = page.locator(locators.emailError);
      this.passwordError = page.locator(locators.passwordError);
      this.firstNameError = page.locator(locators.firstNameError);
      this.lastNameError = page.locator(locators.lastNameError);
      this.phoneError = page.locator(locators.phoneError);

      // Локаторы невалидных ошибок
      this.emailInvalid = page.locator(locators.emailInvalid);
      this.passwordInvalid = page.locator(locators.passwordInvalid);
      this.phoneInvalid = page.locator(locators.phoneInvalid);

      // Личный кабинет
      // this.PersonIcon = page.locator(locators.PersonIcon);
      // this.MyAds = page.locator(locators.MyAds);
      // this.Office = page.locator(locators.Office);
  }

  async register(user: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
  }) 
  {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.phoneInput.fill(user.phone);
    await this.submitButton.click();
  }
  async verifyRequiredFieldsErrors() {
    await expect(this.emailError).toBeVisible();
    await expect(this.passwordError).toBeVisible();
    await expect(this.firstNameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.phoneError).toBeVisible();
  }
  async verifyRequiredFieldsErrorsInvalid() {
    await expect(this.emailInvalid).toBeVisible();
    await expect(this.passwordInvalid).toBeVisible();
    await expect(this.phoneInvalid).toBeVisible();
  }

  // async PersonalAccount() {
  //   await expect(this.PersonIcon).toBeVisible();
  //   await expect(this.MyAds).toContainText('Мои объявления');
  //   await expect(this.Office).toContainText('Кабинет');
  // }
}




