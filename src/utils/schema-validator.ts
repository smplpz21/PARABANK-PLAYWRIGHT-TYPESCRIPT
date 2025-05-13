import Ajv from 'ajv';

// Initialize Ajv instance
const ajv = new Ajv({ allErrors: true });

/**
 * Validates response data against a given JSON schema.
 * @param {object} schema - The JSON schema to validate against.
 * @param {any} data - The data to validate.
 * @returns {boolean} True if the data is valid, false otherwise.
 */
export function validateSchema(schema: object, data: any): boolean {
	const validate = ajv.compile(schema);
	const valid = validate(data);

	if (!valid) {
		console.log('Validation errors:', validate.errors);
	}

	return valid;
}
