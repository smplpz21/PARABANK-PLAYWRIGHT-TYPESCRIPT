import { test, expect } from '../src/fixtures/uiFixture';

test('Login Test', async ({ loginPage }) => {
	await loginPage.navigateTo('/');
});
