import { faker } from '@faker-js/faker';

export function generateUserData() {
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
