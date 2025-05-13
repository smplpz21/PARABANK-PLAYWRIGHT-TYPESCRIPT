import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
/**
 * Generate a random alphanumeric string.
 * @param length - How long the string should be.
 * @returns A random string of the specified length.
 */
export function generateRandomString(length: number): string {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

/**
 * Generates random user data for testing purposes.
 * @returns {Object} An object containing user details such as firstName, lastName, address, city, state, zipCode, phone, ssn, username, and password.
 */
export function generateUserData(): any {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		address: faker.location.streetAddress(),
		city: faker.location.city(),
		state: faker.location.state(),
		zipCode: faker.location.zipCode('#####'),
		phone: faker.phone.number({ style: 'international' }),
		ssn: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
		username: `${faker.internet.username()}_${uuidv4().slice(0, 6)}`,
	};
}

/**
 * Generates random payee data for testing purposes.
 * @returns {Object} An object containing payee details such as payeeName, payeeAddress, payeeCity, payeeState, payeeZip, payeePhone, and payeeAccountNumber.
 */
export function generatePayeeData(): any {
	return {
		payeeName: faker.person.fullName(),
		payeeAddress: faker.location.streetAddress(),
		payeeCity: faker.location.city(),
		payeeState: faker.location.state(),
		payeeZip: faker.location.zipCode('#####'),
		payeePhone: faker.phone.number({ style: 'international' }),
		payeeAccountNumber: faker.finance.accountNumber(),
	};
}
