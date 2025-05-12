import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class OpenNewAccountPage extends BasePage {
	readonly accountTypeDropdown: Locator;
	readonly existingAccountDropdown: Locator;
	readonly openNewAccountButton: Locator;
	readonly newAccountNumberText: Locator;
	readonly openAccountSuccessMessage: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.accountTypeDropdown = page.locator('select[id=type]');
		this.existingAccountDropdown = page.locator('select[id=fromAccountId]');
		this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
		this.newAccountNumberText = page.locator('a[id=newAccountId]');
		this.openAccountSuccessMessage = page.locator('[id=openAccountResult]');
	}

	/**
	 * Opens a new account by selecting the account type and an existing account, then retrieves the new account number.
	 * @param {string} accountType - The type of account to open (e.g., "SAVINGS", "CHECKING").
	 * @param {string} existingAccountNumber - The existing account number to link the new account to.
	 * @returns {Promise<string>} The newly created account number as a string.
	 */
	async openNewAccount(accountType: string, existingAccountNumber: string): Promise<string> {
		await this.selectDropdownByValue(this.accountTypeDropdown, accountType);
		await this.selectDropdownByValue(this.existingAccountDropdown, existingAccountNumber);
		await this.clickElement(this.openNewAccountButton);
		await this.waitForElementVisible(this.newAccountNumberText);
		return await this.getElementText(this.newAccountNumberText);
	}
}
