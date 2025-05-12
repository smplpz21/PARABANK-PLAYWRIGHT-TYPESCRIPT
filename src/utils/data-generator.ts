import { faker } from '@faker-js/faker';

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
		username: faker.internet.username(),
		password: faker.internet.password({ length: 8 }),
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
