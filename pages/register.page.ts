import { Locator, Page, expect } from '@playwright/test';

export class RegisterPage {
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


  constructor(page: Page) {
      this.page = page;
      this.title = page.getByText('Регистрация');
      this.loginLink = page.getByText('Уже есть аккаунт ?');

      // Поля формы
      this.emailInput = page.getByRole('textbox', { name: 'Почта' });
      this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
      this.firstNameInput = page.getByRole('textbox', { name: 'Имя' });
      this.lastNameInput = page.getByRole('textbox', { name: 'Фамилия' });
      this.phoneInput = page.getByRole('textbox', { name: 'Телефон' });
      this.submitButton = page.getByRole('button', { name: 'Зарегестрироватся' });

      // Локаторы ошибок
      this.emailError = page.locator('div.MuiFormControl-root:has-text("Почта") >> text=Заполните поле');
      this.passwordError = page.locator('div.MuiFormControl-root:has-text("Пароль") >> text=Заполните поле');
      this.firstNameError = page.locator('div.MuiFormControl-root:has-text("Имя") >> text=Заполните поле');
      this.lastNameError = page.locator('div.MuiFormControl-root:has-text("Фамилия") >> text=Заполните поле');
      this.phoneError = page.locator('div.MuiFormControl-root:has-text("Телефон") >> text=Заполните поле');

      // Локаторы невалидных ошибок
      this.emailInvalid = page.locator('div.MuiFormControl-root:has-text("Почта") >> text=Неверный формат почты');
      this.passwordInvalid = page.locator('div.MuiFormControl-root:has-text("Пароль") >> text=Мин.длинна - 7 символов');
      this.phoneInvalid = page.locator('div.MuiFormControl-root:has-text("Телефон") >> text=Неверный формат телефона');
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
}




