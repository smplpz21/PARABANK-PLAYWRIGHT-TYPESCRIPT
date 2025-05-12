import { test, expect } from 'src/fixtures/apiFixture';
import { readMetaData, readSchema } from 'src/utils/json-file-reader';
import { validateSchema } from 'src/utils/schemaValidator';

const { newAccountNumber, paymentAmount } = readMetaData('data');
const { findTransctionByAmountResponseSchema } = readSchema('findTransactionSchema');

test('Find transaction by amount | GET', async ({ findTransactionService }) => {
	const response = await findTransactionService.findTransactionByAmount(
		newAccountNumber,
		paymentAmount
	);
	const responseBody = await response.json();

	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	expect(response.statusText()).toBe('OK');
	expect(validateSchema(findTransctionByAmountResponseSchema, responseBody)).toBeTruthy();
	expect(responseBody).toEqual(
		expect.arrayContaining([
			expect.objectContaining({ accountId: +newAccountNumber, amount: +paymentAmount }),
		])
	);
});
