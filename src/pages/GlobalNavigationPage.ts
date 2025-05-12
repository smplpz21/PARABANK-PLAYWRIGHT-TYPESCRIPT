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

	/**
	 * Clicks on the "Open New Account" link.
	 */
	async clickOpenNewAccountLink() {
		await this.clickElement(this.openNewAccountLink);
	}

	/**
	 * Clicks on the "Logout" link.
	 */
	async clickLogoutLink() {
		await this.clickElement(this.logoutLink);
	}

	/**
	 * Clicks on the "Transfer Funds" link.
	 */
	async clickTransferFundsLink() {
		await this.clickElement(this.transferFundsLink);
	}

	/**
	 * Clicks on the "Bill Pay" link.
	 */
	async clickBillPayLink() {
		await this.clickElement(this.billPayLink);
	}

	/**
	 * Clicks on the "Accounts Overview" link.
	 */
	async clickAccountsOverviewLink() {
		await this.clickElement(this.accountsOverviewLink);
	}

	/**
	 * Checks if all global navigation elements are displayed.
	 * @returns {Promise<boolean>} True if all elements are visible, false otherwise.
	 */
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
