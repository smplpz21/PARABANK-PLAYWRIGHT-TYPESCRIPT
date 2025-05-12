import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class RegistrationPage extends BasePage {
	readonly firstNameTextbox: Locator;
	readonly lastNameTextbox: Locator;
	readonly addressTextbox: Locator;
	readonly cityTextbox: Locator;
	readonly stateTextbox: Locator;
	readonly zipCodeTextbox: Locator;
	readonly phoneTextbox: Locator;
	readonly ssnTextbox: Locator;
	readonly userNameTextbox: Locator;
	readonly passwordTextbox: Locator;
	readonly confirmTextbox: Locator;
	readonly registerButton: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.firstNameTextbox = page.locator('input[id="customer.firstName"]');
		this.lastNameTextbox = page.locator('input[id="customer.lastName"]');
		this.addressTextbox = page.locator('input[id="customer.address.street"]');
		this.cityTextbox = page.locator('input[id="customer.address.city"]');
		this.stateTextbox = page.locator('input[id="customer.address.state"]');
		this.zipCodeTextbox = page.locator('input[id="customer.address.zipCode"]');
		this.phoneTextbox = page.locator('input[id="customer.phoneNumber"]');
		this.ssnTextbox = page.locator('input[id="customer.ssn"]');
		this.userNameTextbox = page.locator('input[id="customer.username"]');
		this.passwordTextbox = page.locator('input[id="customer.password"]');
		this.confirmTextbox = page.locator('input[id="repeatedPassword"]');
		this.registerButton = page.getByRole('button', { name: 'REGISTER' });
	}

	async registerUser(data: any) {
		await this.fillTextbox(this.firstNameTextbox, data.firstName);
		await this.fillTextbox(this.lastNameTextbox, data.lastName);
		await this.fillTextbox(this.addressTextbox, data.address);
		await this.fillTextbox(this.cityTextbox, data.city);
		await this.fillTextbox(this.stateTextbox, data.state);
		await this.fillTextbox(this.zipCodeTextbox, data.zipCode);
		await this.fillTextbox(this.phoneTextbox, data.phone);
		await this.fillTextbox(this.ssnTextbox, data.ssn);
		await this.fillTextbox(this.userNameTextbox, data.username);
		await this.fillTextbox(this.passwordTextbox, data.password);
		await this.fillTextbox(this.confirmTextbox, data.password);
		await this.clickElement(this.registerButton);
	}
}
