import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
export default class TransferFundPage extends BasePage {
	readonly fromAccountDropdown: Locator;
	readonly toAccountDropdown: Locator;
	readonly amountTextbox: Locator;
	readonly descriptionTextbox: Locator;
	readonly transferButton: Locator;
	readonly transferConfirmationMessage: Locator;
	readonly transferFundSuccessMessage: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.amountTextbox = page.locator('input[id=amount]');
		this.fromAccountDropdown = page.locator('select[id=fromAccountId]');
		this.toAccountDropdown = page.locator('select[id=toAccountId]');
		this.descriptionTextbox = page.locator('input[id=description]');
		this.transferButton = page.getByRole('button', { name: 'Transfer' });
		this.transferConfirmationMessage = page.locator('.title');
		this.transferFundSuccessMessage = page.locator('#showResult');
	}

	async transferFunds(amount: string, fromAccount: string, toAccount: string) {
		await this.fillTextbox(this.amountTextbox, amount);
		await this.selectDropdownByValue(this.fromAccountDropdown, fromAccount);
		await this.selectDropdownByValue(this.toAccountDropdown, toAccount);
		await this.clickElement(this.transferButton);
	}
}
