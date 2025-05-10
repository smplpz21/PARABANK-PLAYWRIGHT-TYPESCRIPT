import { test as baseTest, BrowserContext, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

type customBrowserContext = {
	context: BrowserContext;
	customPage: Page;
};

type pageObjects = {
	loginPage: LoginPage;
	registrationPage: RegistrationPage;
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
	registrationPage: async ({ customPage }, use) => {
		use(new RegistrationPage(customPage));
	},
});

export const test = customTest;
export const expect = customTest.expect;
