import { test, expect } from '../fixtures/test.fixture';
import { TestUsers } from '../test-data';

test.describe('Авторизация', () => {
  test('Авторизация зарегистрированного пользователя', async ({ mainPage, authPage, page }) => {
    // 1. Открываем форму авторизации
    await page.goto('/');
    await mainPage.openLoginForm();

    // 2. Заполняем и отправляем форму
    await authPage.login(TestUsers.registered.email, TestUsers.registered.password);

    // 3. Проверяем результат
    await expect(page.getByTestId('PersonIcon')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Мои объявления');
    await expect(page.locator('#root')).toContainText('Кабинет');
  });

  test('Авторизация незарегистрированного пользователя', async ({ mainPage, authPage, page }) => {
    // 1. Открываем форму авторизации
    await page.goto('/');
    await mainPage.openLoginForm();

    await authPage.login(TestUsers.unregistered.email, TestUsers.unregistered.password);
    await expect(page.getByRole('alert')).toContainText('Неправильный логин или пароль');
  });

  test('Авторизация с незаполненными данными', async ({ mainPage, authPage, page }) => {
    // 1. Открываем форму авторизации
    await page.goto('/');
    await mainPage.openLoginForm();
  
    // 2. Пытаемся отправить пустую форму
    await authPage.submitButton.click();
  
    // 3. Проверяем сообщения об ошибках
    await authPage.verifyEmptyFormErrors();

    // 4. Переход на регистрацию (должен работать даже с ошибками)
    await authPage.navigateToRegistration();
  });

  test('Авторизация с невалидным форматом почты', async ({ mainPage, authPage, page }) => {
    // 1. Открываем форму авторизации
    await page.goto('/');
    await mainPage.openLoginForm();
  
    await authPage.login(TestUsers.invalid.email, TestUsers.invalid.password);
    await authPage.verifyEmptyFormErrorsInvalid();
    });
});