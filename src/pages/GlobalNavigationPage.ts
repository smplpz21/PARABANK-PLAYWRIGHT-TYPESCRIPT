import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class GlobalNavigationPage extends BasePage {
	readonly welcomeMessageGlobal: Locator;
	readonly logoutLink: Locator;
	readonly openNewAccountLink: Locator;
	readonly transferFundsLink: Locator;
	readonly billPayLink: Locator;
	readonly accountsOverviewLink: Locator;
	readonly findTransactionLink: Locator;
	readonly updateContactInfoLink: Locator;
	readonly requestLoanLink: Locator;
	readonly accountServicesHeader: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.welcomeMessageGlobal = page.locator('.smallText');
		this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
		this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
		this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
		this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
		this.findTransactionLink = page.getByRole('link', { name: 'Find Transactions' });
		this.updateContactInfoLink = page.getByRole('link', { name: 'Update Contact Info' });
		this.requestLoanLink = page.getByRole('link', { name: 'Find Transactions' });
		this.logoutLink = page.getByRole('link', { name: 'Log Out' });
		this.accountServicesHeader = page.getByRole('heading', { name: 'Account Services' });
	}

	async clickOpenNewAccountLink() {
		await this.clickElement(this.openNewAccountLink);
	}

	async clickLogoutLink() {
		await this.clickElement(this.logoutLink);
	}

	async clickTransferFundsLink() {
		await this.clickElement(this.transferFundsLink);
	}

	async clickBillPayLink() {
		await this.clickElement(this.billPayLink);
	}

	async clickAccountsOverviewLink() {
		await this.clickElement(this.accountsOverviewLink);
	}

	async areAllGlobalNavigationElementDisplayed(): Promise<boolean> {
		const elements = [
			this.welcomeMessageGlobal,
			this.accountServicesHeader,
			this.openNewAccountLink,
			this.accountsOverviewLink,
			this.transferFundsLink,
			this.billPayLink,
			this.findTransactionLink,
			this.updateContactInfoLink,
			this.requestLoanLink,
			this.logoutLink,
		];
		for (const element of elements) {
			if (!(await element.isVisible())) {
				return false;
			}
		}
		return true;
	}
}
