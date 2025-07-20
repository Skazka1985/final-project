import { test, expect } from '../fixtures/test.fixture';
import { TestUsers } from '../test-data';

test.describe('Подача объявлений', () => {
  test.beforeEach(async ({ mainPage, authPage }) => {
    // Авторизация перед каждым тестом
    await mainPage.navigate();
    await mainPage.openLoginForm();
    await authPage.login(TestUsers.registered.email, TestUsers.registered.password);
  });

  test('Подача объявлений во всех категориях', async ({ adPage }) => {
    const categories = ['Одежда', 'Техника', 'Спорт', 'Услуги'];
    const initialCount = await adPage.getActiveAdsCount();

    for (const [index, category] of categories.entries()) {
      const adData = {
        title: `${category}-${Math.random().toString(36).substring(2, 6)}`,
        category,
        description: `Тестовое объявление в категории ${category}`,
        price: Math.floor(Math.random() * 500) + 1
      };

      // Дебаг-информация
      console.log(`Создаем объявление #${index + 1}: ${adData.title}`);
      
      await adPage.createAd(adData);

      // Проверяем увеличение счетчика
      await expect(async () => {
        const currentCount = await adPage.getActiveAdsCount();
        expect(currentCount).toBe(initialCount + index + 1);
      }).toPass({ timeout: 10000 });

      // Проверяем отображение объявления
      await adPage.verifyAdVisible(adData.title);
      
      // Возвращаемся на страницу объявлений
      await adPage.page.getByText('Мои объявления').click();
    }
  });
});