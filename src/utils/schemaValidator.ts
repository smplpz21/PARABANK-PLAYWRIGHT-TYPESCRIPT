import Ajv from 'ajv';

// Initialize Ajv instance
const ajv = new Ajv({ allErrors: true });

// Function to validate response data against a schema
export function validateSchema(schema: object, data: any): boolean {
	const validate = ajv.compile(schema);
	const valid = validate(data);

	if (!valid) {
		console.log('Validation errors:', validate.errors);
	}

	return valid;
}
