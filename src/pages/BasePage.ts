import { Locator, Page } from 'playwright/test';

export default class BasePage {
	constructor(readonly page: Page) {
		this.page = page;
	}

	/**
	 * Navigates to the specified URL.
	 * @param {string} url - The URL to navigate to.
	 */
	async navigateTo(url: string) {
		await this.page.goto(url, { waitUntil: 'load' });
	}

	/**
	 * Clicks on the specified element.
	 * @param {Locator} element - The element to click.
	 */
	protected async clickElement(element: Locator) {
		await element.click();
	}

	/**
	 * Fills the specified textbox with the given text.
	 * @param {Locator} element - The textbox element.
	 * @param {string} text - The text to fill in the textbox.
	 */
	async fillTextbox(element: Locator, text: string) {
		await element.fill(text);
	}

	/**
	 * Retrieves the text content of the specified element.
	 * @param {Locator} element - The element to retrieve text from.
	 * @returns {Promise<string>} The text content of the element.
	 */
	protected async getElementText(element: Locator): Promise<string> {
		return (await element.textContent())!;
	}

	/**
	 * Waits for the specified element to become visible.
	 * @param {Locator} element - The element to wait for.
	 * @throws Will throw an error if the page is closed or the element is not visible.
	 */
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

	/**
	 * Waits for the specified element to become hidden.
	 * @param {Locator} element - The element to wait for.
	 */
	protected async waitForElementHidden(element: Locator) {
		await element.waitFor({ state: 'hidden', timeout: 30000 });
	}

	/**
	 * Takes a screenshot of the current page.
	 * @param {string} filename - The name of the file to save the screenshot as.
	 */
	protected async takeScreenshot(filename: string) {
		await this.page.screenshot({ path: filename });
	}

	/**
	 * Checks if the specified element is visible.
	 * @param {Locator} element - The element to check.
	 * @returns {Promise<boolean>} True if the element is visible, false otherwise.
	 */
	protected async isElementVisible(element: Locator): Promise<boolean> {
		return await element.isVisible();
	}

	/**
	 * Checks if the specified element is hidden.
	 * @param {Locator} element - The element to check.
	 * @returns {Promise<boolean>} True if the element is hidden, false otherwise.
	 */
	protected async isElementHidden(element: Locator): Promise<boolean> {
		return await element.isHidden();
	}

	/**
	 * Selects an option from a dropdown by its label.
	 * @param {Locator} dropdown - The dropdown element.
	 * @param {string} option - The label of the option to select.
	 */
	protected async selectDropdownByValue(dropdown: Locator, option: string) {
		await dropdown.selectOption({ label: option });
	}

	/**
	 * Retrieves the title of the current page.
	 * @returns {Promise<string>} The title of the page.
	 */
	async getPageTitle(): Promise<string> {
		return await this.page.title();
	}
}
