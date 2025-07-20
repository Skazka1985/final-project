// import { test, expect } from '../fixtures/test.fixture';
// import { TestUsers, generateRandomUser } from '../test-data';

// test.describe('Регистрация', () => {
//   test('Успешная регистрация', async ({ mainPage, authPage, registerPage, page }) => {
//     // 1. Навигация
//     await page.goto('/');
//     await mainPage.openLoginForm();
//     await authPage.navigateToRegistration();
    
//     // 2. Регистрация
//     const newUser = generateRandomUser();
//     await registerPage.register(newUser);
    
//     // 3. Проверки
//     await expect(page.getByTestId('PersonIcon')).toBeVisible();
//     await expect(page.getByText(newUser.firstName)).toBeVisible();
//   });

//   test('Регистрация существующего пользователя', async ({ mainPage, authPage, registerPage, page }) => {
//     await page.goto('/');
//     await mainPage.openLoginForm();
//     await authPage.navigateToRegistration();
    
//     await registerPage.register(TestUsers.registered);
//     await expect(page.getByRole('alert'))
//       .toContainText(/уже существует|уже зарегистрирован/i);
//   });

//   test('Регистрация с незаполненными данными', async ({ page, mainPage, authPage, registerPage}) => {
//     await page.goto('/');
//     await mainPage.openLoginForm();
//     await authPage.navigateToRegistration();
    
//     await registerPage.submitButton.click();

//     await registerPage.verifyRequiredFieldsErrors();
//   });

//   test('Регистрация с невалидными данными', async ({ page, mainPage, authPage, registerPage}) => {
//     await page.goto('/');
//     await mainPage.openLoginForm();
//     await authPage.navigateToRegistration();
    
//     await registerPage.submitButton.click();
//     await registerPage.register(TestUsers.invalid);
//     await registerPage.verifyRequiredFieldsErrorsInvalid();
//   });
// });