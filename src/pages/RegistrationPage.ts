import { Locator, Page } from 'playwright/test';
import { generateUserData } from 'src/utils/data-generator';
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
	readonly userNameExistError: Locator;

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
		this.userNameExistError = page.locator('span[id="customer.username.errors"]');
	}

	/**
	 * Registers a new user by filling out the registration form and handling username conflicts.
	 * If the username already exists, it retries with a new username up to a maximum number of attempts.
	 *
	 * @param {any} data - The user data containing fields such as firstName, lastName, address, city, state, zipCode, phone, ssn, and username.
	 * @param {string} password - The password to be used for registration.
	 */
	async registerUser(data: any, password: string) {
		let attempts = 0;
		const maxAttempts = 10;

		// Fill static fields once
		await this.fillTextbox(this.firstNameTextbox, data.firstName);
		await this.fillTextbox(this.lastNameTextbox, data.lastName);
		await this.fillTextbox(this.addressTextbox, data.address);
		await this.fillTextbox(this.cityTextbox, data.city);
		await this.fillTextbox(this.stateTextbox, data.state);
		await this.fillTextbox(this.zipCodeTextbox, data.zipCode);
		await this.fillTextbox(this.phoneTextbox, data.phone);
		await this.fillTextbox(this.ssnTextbox, data.ssn);

		while (attempts < maxAttempts) {
			// Fill dynamic fields (username and passwords)
			await this.fillTextbox(this.userNameTextbox, data.username);
			await this.fillTextbox(this.passwordTextbox, password);
			await this.fillTextbox(this.confirmTextbox, password);

			await this.clickElement(this.registerButton);

			// Wait for possible error
			await this.page.waitForTimeout(500);

			const isUserExists = await this.userNameExistError.isVisible();

			if (!isUserExists) {
				break;
			}

			// Retry
			attempts++;
			console.log(`Username "${data.username}" already exists. Retrying...`);

			// Generate new username only
			const newUser = generateUserData();
			data.username = newUser.username;

			await this.fillTextbox(this.userNameTextbox, '');
			await this.fillTextbox(this.userNameTextbox, data.username);
			await this.fillTextbox(this.passwordTextbox, password);
			await this.fillTextbox(this.confirmTextbox, password);
		}
	}
}
