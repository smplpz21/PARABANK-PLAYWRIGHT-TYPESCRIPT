import { test as baseTest, BrowserContext, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AccountsOverviewPage from '../pages/AccountsOverviewPage';
import GlobalNavigationPage from '../pages/GlobalNavigationPage';
import OpenNewAccountPage from '../pages/OpenNewAccountPage';
import TransferFundPage from '../pages/TransferFundPage';
import BillPaymentPage from '../pages/BillPaymentPage';

type customBrowserContext = {
	context: BrowserContext;
	customPageFixture: Page;
};

type pageObjects = {
	loginPage: LoginPage;
	registrationPage: RegistrationPage;
	accountsOverviewPage: AccountsOverviewPage;
	globalNavigationPage: GlobalNavigationPage;
	openNewAccountPage: OpenNewAccountPage;
	transferFundPage: TransferFundPage;
	billPaymentPage: BillPaymentPage;
};

/**
 * Extends the Playwright base test with custom browser context and page objects.
 *
 * @typedef {Object} customBrowserContext
 * @property {BrowserContext} context - The browser context for the test.
 * @property {Page} customPageFixture - The Playwright page instance for the test.
 *
 * @typedef {Object} pageObjects
 * @property {LoginPage} loginPage - The page object for the login page.
 * @property {RegistrationPage} registrationPage - The page object for the registration page.
 * @property {AccountsOverviewPage} accountsOverviewPage - The page object for the accounts overview page.
 * @property {GlobalNavigationPage} globalNavigationPage - The page object for the global navigation.
 * @property {OpenNewAccountPage} openNewAccountPage - The page object for the open new account page.
 * @property {TransferFundPage} transferFundPage - The page object for the transfer funds page.
 * @property {BillPaymentPage} billPaymentPage - The page object for the bill payment page.
 */
const customTest = baseTest.extend<customBrowserContext & pageObjects>({
	context: async ({ browser }, use) => {
		const context = await browser.newContext();
		await use(context);
		await context.close();
	},
	customPageFixture: async ({ context }, use) => {
		const page = await context.newPage();
		await use(page);
	},
	loginPage: async ({ customPageFixture }, use) => {
		use(new LoginPage(customPageFixture));
	},
	registrationPage: async ({ customPageFixture }, use) => {
		use(new RegistrationPage(customPageFixture));
	},
	accountsOverviewPage: async ({ customPageFixture }, use) => {
		use(new AccountsOverviewPage(customPageFixture));
	},
	globalNavigationPage: async ({ customPageFixture }, use) => {
		use(new GlobalNavigationPage(customPageFixture));
	},
	openNewAccountPage: async ({ customPageFixture }, use) => {
		use(new OpenNewAccountPage(customPageFixture));
	},
	transferFundPage: async ({ customPageFixture }, use) => {
		use(new TransferFundPage(customPageFixture));
	},
	billPaymentPage: async ({ customPageFixture }, use) => {
		use(new BillPaymentPage(customPageFixture));
	},
});

export const test = customTest;
export const expect = customTest.expect;
