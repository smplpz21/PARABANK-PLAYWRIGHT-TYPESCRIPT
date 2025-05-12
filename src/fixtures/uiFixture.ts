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
