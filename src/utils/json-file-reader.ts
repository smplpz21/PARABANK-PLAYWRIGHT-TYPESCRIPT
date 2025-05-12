import fs from 'fs';
import path from 'path';

/**
 * Reads test data from a JSON file.
 * @param {string} fileName - The name of the test data file (without extension).
 * @param {string} testType - The type of test (e.g., "ui", "api").
 * @returns {any} The parsed test data.
 */
export function readTestData(fileName: string, testType: string): any {
	try {
		const filePath = path.resolve(`src/test-data/${testType}/${fileName}.json`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(fileContent);
	} catch (error) {
		console.error(`Error reading test data file: ${fileName}.json`);
		return {};
	}
}

/**
 * Writes test data to a JSON file.
 * @param {string} filePath - The path to the JSON file.
 * @param {any} data - The test data to write.
 */
export function writeTestData(filePath: string, data: any): void {
	try {
		const resolvedPath = path.resolve(filePath);
		fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2), 'utf-8');
		console.log(`Test data written to: ${resolvedPath}`);
	} catch (error) {
		console.error(`Error writing test data to file: ${filePath}`);
	}
}

/**
 * Reads metadata from a JSON file.
 * @param {string} filename - The name of the metadata file (without extension).
 * @returns {any} The parsed metadata.
 */
export function readMetaData(filename: string) {
	return JSON.parse(fs.readFileSync(`src/auth/${filename}.meta.json`, 'utf-8'));
}

/**
 * Reads a schema from a JSON file.
 * @param {string} filename - The name of the schema file (without extension).
 * @returns {any} The parsed schema.
 */
export function readSchema(filename: string) {
	return JSON.parse(fs.readFileSync(`src/test-data/api/schemas/${filename}.json`, 'utf-8'));
}
