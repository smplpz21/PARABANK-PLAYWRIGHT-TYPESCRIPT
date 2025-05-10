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

	async login(username: string, password: string) {
		await this.fillTextbox(this.userNameTextbox, username);
		await this.fillTextbox(this.passwordTextbox, password);
		await this.clickElement(this.loginButton);
		// await this.waitForElementVisible(this.page.getByText('Accounts Overview'));
		// await this.takeScreenshot('login.png');
		// await this.waitForElementHidden(this.page.getByText('Accounts Overview'));
		// await this.takeScreenshot('login2.png');
		// await this.isElementVisible(this.page.getByText('Accounts Overview'));
		// await this.isElementHidden(this.page.getByText('Accounts Overview'));
	}

	async clickRegisterLink() {
		await this.clickElement(this.registerLink);
	}
}
