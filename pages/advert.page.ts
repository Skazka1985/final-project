import { Locator, Page, expect } from '@playwright/test';

export class AdPage {
  readonly page: Page;
  readonly createAdButton: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly priceInput: Locator;
  readonly submitButton: Locator;
  readonly activeAdsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createAdButton = page.getByRole('button', { name: 'Подать объявление' });
    this.titleInput = page.getByRole('textbox', { name: 'Название товара/услуги' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Описание' });
    this.priceInput = page.getByRole('textbox', { name: 'Цена' });
    this.submitButton = page.getByRole('button', { name: 'Подать объявление' }).nth(1);
    this.activeAdsTab = page.locator('.UserAdvertList_statusItemActive__iCcqd');
  }

  async getActiveAdsCount(): Promise<number> {
    const countText = await this.activeAdsTab.textContent();
    return parseInt(countText?.match(/\((\d+)\)/)?.[1] || '0');
  }

    async selectCategory(categoryName: string) {
    // Ждем появления контейнера с категориями
    await this.page.locator('.Categories_item__RBV65').first().waitFor();
    
    // Используем точный поиск по тексту внутри элементов категорий
    await this.page.locator('.Categories_item__RBV65', { hasText: categoryName }).click();
  }

  async createAd(adData: {
    title: string;
    category: string;
    description: string;
    price: number;
  }) {
    await this.createAdButton.click();
    await this.titleInput.fill(adData.title);
    await this.selectCategory(adData.category);
    await this.descriptionInput.fill(adData.description);
    await this.priceInput.fill(adData.price.toString());
    await this.submitButton.click();
  }

  async verifyAdVisible(title: string) {
    await expect(this.page.getByText(title)).toBeVisible();
  }
}