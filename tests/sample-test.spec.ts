import { test, expect } from '../src/fixtures/uiFixture';
import { generateUserData } from '../src/utils/utilities';

const userData = generateUserData();

test.describe('Parabank End-To-End User Flow', () => {
	test('User should be able to manage fund successfully', async ({
		loginPage,
		registrationPage,
	}) => {
		await test.step('Navigate to Parabank', async () => {
			await loginPage.navigateTo('/');
		});
		await test.step('User should be able to register', async () => {
			await loginPage.clickRegisterLink();
			await registrationPage.registerUser(userData);
			await expect(registrationPage.registerSuccessMessage).toBeVisible();
			await expect(registrationPage.registerSuccessMessage).toHaveText(
				'Your account was created successfully. You are now logged in.'
			);
			expect(await registrationPage.getWelcomeMessage()).toEqual(
				`Welcome ${userData.username}`
			);
		});
	});
});
