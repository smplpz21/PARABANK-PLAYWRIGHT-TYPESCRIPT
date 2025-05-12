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

	async getExistingAccountNumber(): Promise<string> {
		return await this.getElementText(this.existingAccountNumber);
	}

	async getAccountBalance(accountId: string) {
		return await this.getElementText(this.accountBalance(accountId));
	}
}
