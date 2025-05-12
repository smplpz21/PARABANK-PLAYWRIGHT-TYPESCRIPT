import { APIRequestContext, request, test as baseTest } from '@playwright/test';

import FindTransctionService from '../services/FindTransctionService';

type customApiContext = {
	apiContext: APIRequestContext;
};
type apiServices = {
	findTransactionService: FindTransctionService;
};

/**
 * Extends the Playwright base test with custom API context and services.
 *
 * @typedef {Object} customApiContext
 * @property {APIRequestContext} apiContext - The API request context for making HTTP requests.
 *
 * @typedef {Object} apiServices
 * @property {FindTransctionService} findTransactionService - The service for interacting with the "Find Transaction" API.
 */
const customApiTest = baseTest.extend<apiServices & customApiContext>({
	apiContext: async ({}, use) => {
		const context = await request.newContext({ storageState: 'src/auth/login.json' });
		use(context);
	},

	findTransactionService: async ({ apiContext }, use) => {
		await use(new FindTransctionService(apiContext));
	},
});

export const test = customApiTest;
export const expect = customApiTest.expect;
