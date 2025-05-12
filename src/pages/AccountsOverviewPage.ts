import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class AccountsOverviewPage extends BasePage {
	readonly successRegistrationMessage: Locator;
	readonly existingAccountNumber: Locator;
	readonly accountsOverviewPagetitle: Locator;
	readonly accountBalance: any;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.successRegistrationMessage = page.locator('#rightPanel');
		this.existingAccountNumber = page.locator('table tbody tr a').first();
		this.accountsOverviewPagetitle = page.locator('.title', { hasText: 'Accounts Overview' });
		this.accountBalance = (accountId: string) =>
			page
				.locator('table tr', { has: page.locator(`a[href*="id=${accountId}"]`) })
				.locator('td')
				.nth(1);
	}

	/**
	 * Retrieves the text of the first account number displayed in the accounts overview table.
	 * @returns {Promise<string>} The account number as a string.
	 */
	async getExistingAccountNumber(): Promise<string> {
		return await this.getElementText(this.existingAccountNumber);
	}

	/**
	 * Retrieves the balance of a specific account based on the account ID.
	 * @param {string} accountId - The ID of the account for which the balance is to be retrieved.
	 * @returns {Promise<string>} The account balance as a string.
	 */
	async getAccountBalance(accountId: string) {
		return await this.getElementText(this.accountBalance(accountId));
	}
}
