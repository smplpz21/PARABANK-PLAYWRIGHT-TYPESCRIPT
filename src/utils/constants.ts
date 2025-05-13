/**
 * Contains reusable message templates for various actions and events in the application.
 */
export const MESSAGES = {
	REGISTRATION_SUCCESSFUL: (username: string) =>
		`Welcome ${username} Your account was created successfully. You are now logged in.`,

	LOGIN_WELCOME: (firstname: string, lastName: string) => `Welcome ${firstname} ${lastName}`,

	ACCOUNT_CREATION_SUCCESS: (accountNumber: string) =>
		`Account Opened! Congratulations, your account is now open. Your new account number: ${accountNumber}`,

	TRANSFER_SUCCESS: (amount: string, from: string, to: string) =>
		`Transfer Complete! $${amount}.00 has been transferred from account #${from} to account #${to}. See Account Activity for more details.`,

	BILL_PAYMENT_SUCCESS: (payeeName: string, amount: string, from: string) =>
		`Bill Payment Complete Bill Payment to ${payeeName} in the amount of $${amount}.00 from account ${from} was successful. See Account Activity for more details.`,
};

export const TRANSACTIONS = {
	MINIMUM_DEPOSIT_AMOUNT: '$100.00',
};
