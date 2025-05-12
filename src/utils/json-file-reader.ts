import fs from 'fs';
import path from 'path';

/**
 * Reads test data from a JSON file.
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

export function readMetaData(filenme: string) {
	return JSON.parse(fs.readFileSync(`src/auth/${filenme}.meta.json`, 'utf-8'));
}

export function readSchema(filename: string) {
	return JSON.parse(fs.readFileSync(`src/test-data/api/schemas/${filename}.json`, 'utf-8'));
}
