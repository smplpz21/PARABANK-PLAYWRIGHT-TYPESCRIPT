import { test, expect } from 'src/fixtures/uiFixture';
import { generateUserData, generatePayeeData } from '../../../src/utils/data-generator';
import { MESSAGES } from '../../../src/utils/constants';
import { readTestData, writeTestData } from '../../../src/utils/json-file-reader';

const userData = generateUserData();
const payeeData = generatePayeeData();
const data = readTestData('e2e-data', 'ui');

let existingAccountNumber: string;
let newAccountNumber: string;

test.describe('Parabank End-To-End User Flow', () => {
	test('User should be able to manage fund successfully', async ({
		loginPage,
		registrationPage,
		accountsOverviewPage,
		globalNavigationPage,
		openNewAccountPage,
		transferFundPage,
		billPaymentPage,
	}) => {
		await test.step('Navigate to application', async () => {
			await loginPage.navigateTo(data.rootUrl);
			expect(await loginPage.getPageTitle()).toBe(data.landingPageTitle);
		});

		await test.step('Register a new user ', async () => {
			await loginPage.clickRegisterLink();
			await registrationPage.registerUser(userData);
			await expect(accountsOverviewPage.successRegistrationMessage).toBeVisible();
			await expect(accountsOverviewPage.successRegistrationMessage).toHaveText(
				MESSAGES.REGISTRATION_SUCCESSFUL(userData.username)
			);
		});

		await test.step('Login with new user', async () => {
			await globalNavigationPage.clickLogoutLink();
			await loginPage.login(userData.username, userData.password);
			// Save authenticated storageState
			await loginPage.page.context().storageState({ path: data.authStoragePath });
			existingAccountNumber = await accountsOverviewPage.getExistingAccountNumber();
			await expect(accountsOverviewPage.accountsOverviewPagetitle).toBeVisible();
			await expect(accountsOverviewPage.accountsOverviewPagetitle).toHaveText(
				data.accountsOverviewTitle
			);
		});

		await test.step('Verify navigation menu', async () => {
			expect(globalNavigationPage.areAllGlobalNavigationElementDisplayed()).toBeTruthy();
			await expect(globalNavigationPage.welcomeMessageGlobal).toHaveText(
				MESSAGES.LOGIN_WELCOME(userData.firstName, userData.lastName)
			);
		});

		await test.step('Create a Savings account', async () => {
			await globalNavigationPage.clickOpenNewAccountLink();
			newAccountNumber = await openNewAccountPage.openNewAccount(
				data.accountType,
				existingAccountNumber
			);
			// Save the newly created account number and amount to pay to a JSON file for api test
			writeTestData(data.metaDataPath, { newAccountNumber, paymentAmount: data.paymentAmount });
			await expect(openNewAccountPage.openAccountSuccessMessage).toBeVisible();
			await expect(openNewAccountPage.openAccountSuccessMessage).toHaveText(
				MESSAGES.ACCOUNT_CREATION_SUCCESS(newAccountNumber)
			);
		});

		await test.step('Validate account balance', async () => {
			await globalNavigationPage.clickAccountsOverviewLink();
			expect(await accountsOverviewPage.getAccountBalance(newAccountNumber)).toEqual(
				data.newAccountBalance
			);
		});

		await test.step('Transfer funds', async () => {
			await globalNavigationPage.clickTransferFundsLink();
			await transferFundPage.transferFunds(
				data.transferAmount,
				newAccountNumber,
				existingAccountNumber
			);
			await expect(transferFundPage.transferFundSuccessMessage).toBeVisible();
			await expect(transferFundPage.transferFundSuccessMessage).toHaveText(
				MESSAGES.TRANSFER_SUCCESS(data.transferAmount, newAccountNumber, existingAccountNumber)
			);
		});

		await test.step('Pay a bill', async () => {
			await globalNavigationPage.clickBillPayLink();
			await billPaymentPage.payBill(payeeData, data.paymentAmount, newAccountNumber);
			await expect(billPaymentPage.billPaymentSuccessMessage).toBeVisible();
			await expect(billPaymentPage.billPaymentSuccessMessage).toHaveText(
				MESSAGES.BILL_PAYMENT_SUCCESS(payeeData.payeeName, data.paymentAmount, newAccountNumber)
			);
		});
	});
});
