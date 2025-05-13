# 🎭 ParaBank E2E Test Automation with Playwright

## ✨ Overview

This project is an **End-to-End (E2E) automation framework** built using **Playwright** for the [ParaBank](https://parabank.parasoft.com/) online banking application. It covers both **UI** and **API** test scenarios to ensure a complete validation of key user workflows.


## ✅ What’s Implemented in the Parabank App

The Parabank application supports a variety of user actions including:

- 🔐 **User Registration**  
- 🔑 **Login & Logout**
- 🧾 **View Account Summary & Balances**
- 💰 **Open New Savings or Checking Accounts**
- 🔄 **Transfer Funds Between Accounts**
- 🧾 **Bill Payments to External Payees**

These functionalities are fully automated and validated through this E2E suite.

---

## 🧠 Smart Registration Handling

### Dynamic Username Retry Logic

The registration page includes logic to automatically handle **username conflicts** during registration.


## 🚀 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Faker (for generating test data)
- AJV JSON schema validation (for API responses)
- Dotenv
- UUID
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

Run UI first then check report (chromium)

```bash
npx playwright test tests/e2e/ui/e2e-test.spec.ts  --headed --project=chromium
npx playwright show-report
```

Then run API test and check report 

```bash
npx playwright test tests/e2e/api/find-transaction.spec.ts 
npx playwright show-report
```

Run both UI and API (api test is dependent with UI pay bill data)
#### Note: Report generated will be the latest run and since api will be run last, you will only see the api report, so I suggest you run it separately and check report right after executing each test

```bash
npm run test:e2e
```

## 📌 Notes

    •	All usernames generated during registration are random and unique.
    •	API validations use either Playwright’s built-in assertions or custom JSON schema checks
    •	Most of UI assertions use Playwright's built-in assertions for best practice
    •	The test suite runs in sequential order to maintain flow between UI and API validations.

## Author

Sam Lopez - Test Analyst

```bash
If you have any questions and comments regarding the framework feel free to reach out! Happy coding :)
```
