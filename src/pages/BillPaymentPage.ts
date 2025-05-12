import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class BillPaymentPage extends BasePage {
	readonly payeeNameTextbox: Locator;
	readonly payeeAddressTextbox: Locator;
	readonly payeeCityTextbox: Locator;
	readonly payeeStateTextbox: Locator;
	readonly payeeZipTextbox: Locator;
	readonly payeePhoneTextbox: Locator;
	readonly payeeAccountNumberTextbox: Locator;
	readonly payeeVerifyAccountNumberTextbox: Locator;
	readonly amountTextbox: Locator;
	readonly payerFromAccountDropdown: Locator;
	readonly sendPaymentButton: Locator;
	readonly billPaymentSuccessMessage: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.payeeNameTextbox = page.locator('input[name="payee.name"]');
		this.payeeAddressTextbox = page.locator('input[name="payee.address.street"]');
		this.payeeCityTextbox = page.locator('input[name="payee.address.city"]');
		this.payeeStateTextbox = page.locator('input[name="payee.address.state"]');
		this.payeeZipTextbox = page.locator('input[name="payee.address.zipCode"]');
		this.payeePhoneTextbox = page.locator('input[name="payee.phoneNumber"]');
		this.payeeAccountNumberTextbox = page.locator('input[name="payee.accountNumber"]');
		this.payeeVerifyAccountNumberTextbox = page.locator('input[name="verifyAccount"]');
		this.amountTextbox = page.locator('input[name="amount"]');
		this.payerFromAccountDropdown = page.locator('select[name="fromAccountId"]');
		this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
		this.billPaymentSuccessMessage = page.locator('div#billpayResult');
	}

	async payBill(data: any, amount: string, fromAccount: string) {
		await this.fillTextbox(this.payeeNameTextbox, data.payeeName);
		await this.fillTextbox(this.payeeAddressTextbox, data.payeeAddress);
		await this.fillTextbox(this.payeeCityTextbox, data.payeeCity);
		await this.fillTextbox(this.payeeStateTextbox, data.payeeState);
		await this.fillTextbox(this.payeeZipTextbox, data.payeeZip);
		await this.fillTextbox(this.payeePhoneTextbox, data.payeePhone);
		await this.fillTextbox(this.payeeAccountNumberTextbox, data.payeeAccountNumber);
		await this.fillTextbox(this.payeeVerifyAccountNumberTextbox, data.payeeAccountNumber);
		await this.fillTextbox(this.amountTextbox, amount);
		await this.selectDropdownByValue(this.payerFromAccountDropdown, fromAccount);
		await this.waitForElementVisible(this.sendPaymentButton);
		await this.clickElement(this.sendPaymentButton);
		await this.waitForElementVisible(this.billPaymentSuccessMessage);
	}
}
