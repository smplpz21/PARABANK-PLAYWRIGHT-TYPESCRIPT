import { Locator, Page } from 'playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {
	readonly usernameTextbox: Locator;
	readonly passwordTextbox: Locator;
	readonly loginButton: Locator;

	constructor(readonly page: Page) {
		super(page);
		// Initialize locators
		this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
		this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
		this.loginButton = page.getByRole('button', { name: 'LOG IN' });
	}

	async enterUsername(username: string) {
		await this.fillTextbox(this.usernameTextbox, username);
	}

	async enterPassword(password: string) {
		await this.fillTextbox(this.passwordTextbox, password);
	}

	async clickLoginButton() {
		await this.clickElement(this.loginButton);
	}
}
