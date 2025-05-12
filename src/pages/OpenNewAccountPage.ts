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

	async openNewAccount(accountType: string, existingAccountNumber: string): Promise<string> {
		await this.selectDropdownByValue(this.accountTypeDropdown, accountType);
		await this.selectDropdownByValue(this.existingAccountDropdown, existingAccountNumber);
		await this.clickElement(this.openNewAccountButton);
		await this.waitForElementVisible(this.newAccountNumberText);
		return await this.getElementText(this.newAccountNumberText);
	}
}
