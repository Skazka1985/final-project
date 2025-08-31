import { test, expect } from '../fixtures/test.fixture';
import { TestUsers, generateRandomAd } from '../test-data';

test.describe('Подача объявлений', () => {

test('Подача объявления и проверка счетчика', async ({page, mainPage, authPage }) => {
    // 1. Авторизация и проверка авторизации 
    await page.goto('/');
    await mainPage.openLoginForm();
    await authPage.login(TestUsers.registered.email, TestUsers.registered.password);
    await expect(page.getByTestId('PersonIcon')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Мои объявления');
    await expect(page.locator('#root')).toContainText('Кабинет');
    
    // 2. Получаем БАЗОВОЕ количество объявлений ДО теста
    const activeCounterLocator = page.locator('.UserAdvertList_statusItemActive__iCcqd');
    const initialText = await activeCounterLocator.textContent();
    const initialCount = parseInt(initialText.match(/\((\d+)\)/)[1]) || 0;
    console.log(initialCount);

    // 3. Переход на страницу подачи объявлений
    await page.getByRole('button', { name: 'Подать объявление' }).click();
    await expect(page.locator('#root')).toContainText('Подача объявления');
  
    const timestamp = Date.now();
    const adData = {
      title: `Уник${timestamp} Шорты`,
      category: 'Одежда',
      description: `Описание ${timestamp}`,
      price: (100 + (timestamp % 900)).toString()
    };
  
    // 4. Заполняем и отправляем форму
    await page.getByLabel('Название товара/услуги').fill(adData.title);
    await page.locator('div.Categories_itemActive__6fF3I > a', { hasText: adData.category }).click();
    await page.getByLabel('Описание').fill(adData.description);
    await page.getByLabel('Цена').fill(adData.price);
  
    // 5. Отправка формы, проверка результата
    await page.getByRole('button', { name: 'Подать объявление' }).nth(1).click();
    await expect(page.getByRole('alert')).toContainText('Объявление создано');
  
    // 6. Проверки после создания
    await expect(page.locator('#root')).toContainText('Мои объявления');
    await expect(page.locator('#root')).toContainText('Кабинет');
    
    await expect(async () => {
      const currentText = await activeCounterLocator.textContent();
      const currentCount = parseInt(currentText.match(/\((\d+)\)/)[1]) || 0;
      console.log('Текущее количество:', currentCount);
      
    // Проверяем что счётчик увеличился хотя бы на 1
      expect(currentCount).toBeGreaterThan(initialCount);
    }).toPass({ 
      timeout: 15000,
      intervals: [1000, 2000, 5000] // Интервалы между попытками
    });
  });

  test('Подать объявление неавторизованным пользователем', async ({ page, mainPage, authPage }) => {
    // 1. Открываем форму авторизации
    await page.goto('/');

    // 2. Клик на кнопку "Подать объявление"
    await page.getByRole('button', { name: 'Подать объявление' }).click();

    // 3. Переход на страницу авторизации
    await mainPage.openLoginForm();
  });

  test('Подать объявление с незаполненными данными', async ({ page, mainPage, authPage }) => {
    // 1. Авторизация и проверка авторизации 
    await page.goto('/');
    await mainPage.openLoginForm();
    await authPage.login(TestUsers.registered.email, TestUsers.registered.password);
    await expect(page.getByTestId('PersonIcon')).toBeVisible();
    await expect(page.locator('#root')).toContainText('Мои объявления');
    await expect(page.locator('#root')).toContainText('Кабинет');

    // 2. Переход на страницу подачи объявлений
    await page.getByRole('button', { name: 'Подать объявление' }).click();
    await expect(page.locator('#root')).toContainText('Подача объявления');

    // 3. Отправляем пустую форму
    await page.getByRole('button', { name: 'Подать объявление' }).nth(1).click();


    // 4. Проверяем сообщения об ошибках (правильные локаторы)
    await expect(page.locator('text=Заполните поле').first()).toBeVisible();
    await expect(page.locator('text=Заполните поле')).toHaveCount(3); // Проверяем что все 3 поля показывают ошибку  });
  });
});