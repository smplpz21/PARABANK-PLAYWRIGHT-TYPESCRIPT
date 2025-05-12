# 🎭 ParaBank E2E Test Automation with Playwright


## 📌 Notes 
	• The app itself is incosistent 
 	• There are instances that certain functionality is down and won't work (e.g. Find Transctions, Logging out after registration then when logs back it fails with error)
	
    


## ✨ Overview

This project is an **End-to-End (E2E) automation framework** built using **Playwright** for the [ParaBank](https://parabank.parasoft.com/) online banking application. It covers both **UI** and **API** test scenarios to ensure a complete validation of key user workflows.


## 🚀 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Faker (for generating test data)
- JSON schema validation (for API responses)
---

## Pre-requisites (IMPORTANT!!)
Make sure NodeJS and GIT is installed in your machine. If not,
You may install and download it here:
 - [Git](https://git-scm.com/downloads/win)
 - [NodeJs](https://nodejs.org/en)


## 🚀 Getting Started
### Open CMD / VSCode

### 1. Clone the Repository
Make sure to change directory (cd) using the correct repo name below. Same letter casing 
```bash
git clone https://github.com/smplpz21/PARABANK-PLAYWRIGHT-TYPESCRIPT.git
cd PARABANK-PLAYWRIGHT-TYPESCRIPT
```
### 2. Install Dependencies
```bash
npm install
```
### 2. Install Playwright Browsers
```bash
npx playwright install
```
### 3. Running tests
Running UI only (chromium)
```bash
npx playwright test tests/e2e/ui/sample-test.spec.ts  --headed --project=chromium
```
Run both UI and API (api test is dependent with UI pay bill data)

```bash
npm run test:e2e
```

### 4. HTML Report
Each test will generate a separate report
execute command below to load report:
```bash
npx playwright show-report
```

## Author
Sam Lopez - Test Analyst
```bash
If you have any questions and comments regarding the framework feel free to reach out! Happy coding :)
```
