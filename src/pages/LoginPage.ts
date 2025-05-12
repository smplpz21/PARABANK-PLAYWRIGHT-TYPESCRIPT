import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
	readonly userNameTextbox: Locator;
	readonly passwordTextbox: Locator;
	readonly loginButton: Locator;
	readonly registerLink: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.userNameTextbox = page.locator('input[name=username]');
		this.passwordTextbox = page.locator('input[name=password]');
		this.loginButton = page.getByRole('button', { name: 'LOG IN' });
		this.registerLink = page.getByRole('link', { name: 'Register' });
	}

	/**
	 * Logs in using the provided username and password.
	 * @param {string} username - The username to log in with.
	 * @param {string} password - The password to log in with.
	 */
	async login(username: string, password: string) {
		await this.fillTextbox(this.userNameTextbox, username);
		await this.fillTextbox(this.passwordTextbox, password);
		await this.clickElement(this.loginButton);
	}

	/**
	 * Clicks on the "Register" link to navigate to the registration page.
	 */
	async clickRegisterLink() {
		await this.clickElement(this.registerLink);
	}
}
