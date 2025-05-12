import { Locator, Page } from 'playwright/test';

export default class BasePage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	async navigateTo(url: string) {
		await this.page.goto(url, { waitUntil: 'load' });
	}

	protected async clickElement(element: Locator) {
		await element.click();
	}

	async fillTextbox(element: Locator, text: string) {
		await element.fill(text);
	}

	protected async getElementText(element: Locator): Promise<string> {
		return (await element.textContent())!;
	}

	protected async waitForElementVisible(element: Locator) {
		if (this.page.isClosed()) {
			throw new Error('Cannot wait for element — page is already closed.');
		}
		try {
			await this.page.waitForLoadState('domcontentloaded');
			await element.waitFor({ state: 'visible', timeout: 30000 });
		} catch (error) {
			throw new Error(`Element not visible or page was redirected/closed: ${error}`);
		}
	}

	protected async waitForElementHidden(element: Locator) {
		await element.waitFor({ state: 'hidden', timeout: 30000 });
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

	protected async selectDropdownByValue(dropdown: Locator, option: string) {
		await dropdown.selectOption({ label: option });
	}

	async getPageTitle(): Promise<string> {
		return await this.page.title();
	}
}
