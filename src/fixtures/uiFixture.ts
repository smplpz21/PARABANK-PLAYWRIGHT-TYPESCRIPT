import { test as baseTest, BrowserContext, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

type customBrowserContext = {
	context: BrowserContext;
	customPage: Page;
};

type pageObjects = {
	loginPage: LoginPage;
};

const customTest = baseTest.extend<customBrowserContext & pageObjects>({
	context: async ({ browser }, use) => {
		const context = await browser.newContext();
		await use(context);
		await context.close();
	},
	customPage: async ({ context }, use) => {
		const page = await context.newPage();
		await use(page);
	},
	loginPage: async ({ customPage }, use) => {
		use(new LoginPage(customPage));
	},
});

export const test = customTest;
export const expect = customTest.expect;
