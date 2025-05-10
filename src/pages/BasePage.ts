import { Locator, Page } from 'playwright/test';

export default class BasePage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	async navigateTo(url: string) {
		await this.page.goto(url);
	}

	protected async clickElement(element: Locator) {
		await element.click();
	}

	async fillTextbox(element: Locator, text: string) {
		await element.fill(text);
	}

	protected async getElementText(element: Locator): Promise<string> {
		return await element.innerText();
	}

	protected async waitForElementVisible(element: Locator) {
		await element.waitFor({ state: 'visible', timeout: 30000 });
	}

	protected async waitForElementHidden(element: Locator) {
		await element.waitFor({ state: 'hidden', timeout: 5000 });
	}

	protected async takeScreenshot(filename: string) {
		await this.page.screenshot({ path: filename });
	}

	protected async isElementVisible(element: Locator): Promise<boolean> {
		return await element.isVisible();
	}

	protected async isElementHidden(element: Locator): Promise<boolean> {
		return await element.isHidden();
	}

	protected async selectDropdownByValue(selector: string, option: string) {
		await this.page.selectOption(selector, option);
	}
}
