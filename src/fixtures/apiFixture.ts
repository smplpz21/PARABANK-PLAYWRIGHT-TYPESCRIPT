import { APIRequestContext, request, test as baseTest } from '@playwright/test';

import FindTransctionService from '../services/FindTransctionService';

type customApiContext = {
	apiContext: APIRequestContext;
};
type apiServices = {
	findTransactionService: FindTransctionService;
};

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
