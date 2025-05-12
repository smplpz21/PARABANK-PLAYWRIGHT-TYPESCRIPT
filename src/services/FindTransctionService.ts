import { APIRequestContext } from '@playwright/test';

export default class FindTransctionService {
	constructor(private readonly apiContext: APIRequestContext) {
		this.apiContext = apiContext;
	}

	async findTransactionByAmount(accountId: string, paymentAmount: string) {
		return this.apiContext.get(
			`parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${paymentAmount}?timeout=30000`
		);
	}
}
