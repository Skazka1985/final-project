import { test as base } from '@playwright/test';
import { generateRandomUser } from '../test-data';
import { MainPage } from '../pages/main.page';
import { AuthPage } from '../pages/auth.page';
import { RegisterPage } from '../pages/register.page';
import { AdPage } from '../pages/ad.page';

type PageFixtures = {
    mainPage: MainPage;
    authPage: AuthPage;
    registerPage: RegisterPage;
    randomUser: ReturnType<typeof generateRandomUser>;
    adPage: AdPage;
};

export const test = base.extend<PageFixtures>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    authPage: async ({ page }, use) => {
        await use(new AuthPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    randomUser: async ({}, use) => {
      await use(generateRandomUser());
    },
    adPage: async ({ page }, use) => {
        await use(new AdPage(page));
    },
});

export { expect } from '@playwright/test';