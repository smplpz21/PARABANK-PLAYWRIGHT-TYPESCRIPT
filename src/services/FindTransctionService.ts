import { APIRequestContext, APIResponse } from '@playwright/test';

export default class FindTransctionService {
	constructor(private readonly apiContext: APIRequestContext) {
		this.apiContext = apiContext;
	}

	/**
	 * Fetches transactions for a specific account based on the transaction amount.
	 * @param {string} accountId - The ID of the account to search transactions for.
	 * @param {string} paymentAmount - The transaction amount to filter by.
	 * @returns {Promise<APIResponse>} The API response containing the transaction details.
	 */
	async findTransactionByAmount(accountId: string, paymentAmount: string): Promise<APIResponse> {
		return this.apiContext.get(
			`parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${paymentAmount}?timeout=30000`
		);
	}
}
