import { test as base } from '@playwright/test';
import { generateRandomUser } from '../test-data';
import { MainPage } from '../pages/main.page';
import { AuthPage } from '../pages/auth.page';
import { RegisterPage } from '../pages/register.page';
import { AdPage } from '../pages/advert.page';

// 🔹 Выносим ВСЕ локаторы сюда
const Locators = {
  auth: {
    title: 'text=Вход',
    registerLink: 'text=Еще не зарегистрированы ?',
    emailInput: { 
        role: 'textbox',
        name: 'Почта'
      },
    passwordInput: { 
        role: 'textbox',
        name: 'Пароль'
      },
    submitButton: { 
        role: 'button',
        name: 'Войти',
        nth: 1
      },
    emailError: { 
      selector: 'text=Заполните поле',
      nth: 0 // Первое сообщение об ошибке
      },

    passwordError: { 
      selector: 'text=Заполните поле',
      nth: 1 // Второе сообщение об ошибке
    },

    emailInvalid: 'text=Неверный формат почты',
  },
  register: {
    title: 'text=Регистрация',
    loginLink: 'text=Уже есть аккаунт ?',
    emailInput: { 
        role: 'textbox',
        name: 'Почта'
      },
    passwordInput: { 
        role: 'textbox',
        name: 'Пароль'
      },
    firstNameInput: { 
        role: 'textbox',
        name: 'Имя'
      },
    lastNameInput: { 
        role: 'textbox',
        name: 'Фамилия'
      },
    phoneInput: { 
        role: 'textbox',
        name: 'Телефон'
      },
    submitButton: 'button:has-text("Зарегестрироватся")',

    // Локаторы ошибок
    emailError: 'text=Заполните поле >> nth=0',
    passwordError: 'text=Заполните поле >> nth=1',
    firstNameError: 'text=Заполните поле >> nth=2',
    lastNameError: 'text=Заполните поле >> nth=3',
    phoneError: 'text=Заполните поле >> nth=4',
    
    // Локаторы невалидных ошибок
    emailInvalid: 'text=Неверный формат почты',
    passwordInvalid: 'text=Мин.длинна - 7 символов',
    phoneInvalid: 'text=Неверный формат телефона',
  },
  main: {
    loginButton: 'button:has-text("Войти") >> nth=0',
  },
};

type PageFixtures = {
  mainPage: MainPage;
  authPage: AuthPage;
  registerPage: RegisterPage;
  randomUser: ReturnType<typeof generateRandomUser>;
  adPage: AdPage;
  locators: typeof Locators; // 🔹 Добавляем локаторы в фикстуры
};

export const test = base.extend<PageFixtures>({
  locators: async ({}, use) => {
    await use(Locators); // 🔹 Передаём локаторы в тесты
  },
  mainPage: async ({ page, locators }, use) => {
    await use(new MainPage(page, locators.main)); // 🔹 Передаём локаторы в страницы
  },
  authPage: async ({ page, locators }, use) => {
    await use(new AuthPage(page, locators.auth));
  },
  registerPage: async ({ page, locators }, use) => {
    await use(new RegisterPage(page, locators.register));
  },
  randomUser: async ({}, use) => {
    await use(generateRandomUser());
  },
  adPage: async ({ page }, use) => {
    await use(new AdPage(page));
  },
});

export { expect } from '@playwright/test';