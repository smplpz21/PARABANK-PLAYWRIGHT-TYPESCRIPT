import { test, expect } from 'src/fixtures/apiFixture';
import { readGenericData } from 'src/utils/json-handler';
import { validateSchema } from 'src/utils/schema-validator';

const { newAccountNumber, paymentAmount, payeeName } = readGenericData('src/auth/data.meta.json');
const { findTransctionByAmountResponseSchema } = readGenericData(
	'src/test-data/api/schemas/findTransactionSchema.json'
);

test('Find transaction by amount | GET', async ({ findTransactionService }) => {
	const response = await findTransactionService.findTransactionByAmount(
		newAccountNumber,
		paymentAmount
	);
	const responseBody = await response.json();
	console.log(responseBody);
	await expect(response).toBeOK();
	expect(response.status()).toBe(200);
	expect(response.statusText()).toBe('OK');
	expect(validateSchema(findTransctionByAmountResponseSchema, responseBody)).toBeTruthy();
	expect(responseBody).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				accountId: +newAccountNumber,
				amount: +paymentAmount,
				description: `Bill Payment to ${payeeName}`,
			}),
		])
	);
});
