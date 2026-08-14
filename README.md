Automation Anywhere Automation Assignment

Overview

Playwright + TypeScript automation for Automation Anywhere Community Cloud using the Page Object Model (POM).

Use Cases

UC1: Task Bot with Message Box

UC2: Form with Rules Builder

Tech Stack

TypeScript

Playwright

Node.js

npm

Chromium

dotenv

Application

Automation Anywhere Community Cloud:

https://community.cloud.automationanywhere.digital/

Automation Workspace:

https://community.cloud.automationanywhere.digital/#/bots/repository/private/folders/33103175

Project Structure

automation-anywhere-assignment/
│
├── pages/
│   ├── AutomationPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── auth.setup.ts
│   ├── usecase1-message-box.spec.ts
│   └── usecase2-form.spec.ts
│
├── auth/
│   └── user.json
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md

Prerequisites

Install:

Node.js

npm

Verify:

node --version
npm --version

Setup

Extract or clone the project and open the project directory:

cd automation-anywhere-assignment

Install dependencies:

npm install

Create a .env file in the project root:

BASE_URL=https://community.cloud.automationanywhere.digital
AA_EMAIL=your- aishwaryaganeshan33@gmail.com
AA_PASSWORD= A1i2s3h4#

Use valid Automation Anywhere Community Edition credentials.

Do not commit or submit real credentials.

Authentication

Authentication is handled by:

tests/auth.setup.ts

The setup test logs in and stores the authenticated browser state in:

auth/user.json

The dependent Chromium tests reuse this authenticated session.

UC1 - Task Bot with Message Box

Workflow

Log in

Navigate to Automation

Open Create

Select Task Bot

Create the Task Bot

Open Bot Designer

Search for Message Box

Add Message Box

Configure Message Box

Save

Verify the configuration

Test File

tests/usecase1-message-box.spec.ts

Run UC1

npx playwright test tests/usecase1-message-box.spec.ts --project=chromium --headed

UC2 - Form with Rules Builder

Workflow

Log in

Navigate to Automation

Open Create

Select Form

Enter form name and description

Create & Edit

Open Form Designer

Add Text Box elements

Configure form elements

Configure Rules Builder

Save

Verify the form/rules state

Test File

tests/usecase2-form.spec.ts

Run UC2

npx playwright test tests/usecase2-form.spec.ts --project=chromium --headed

The Form Designer URL is generated dynamically and follows:

https://community.cloud.automationanywhere.digital/#/bots/repository/private/files/<FORM_ID>/module/attended/form/edit

Run All Tests

npx playwright test --project=chromium --headed

Reports

Open the Playwright HTML report:

npx playwright show-report

Failed tests may also generate:

Screenshots

Videos

Traces

POM Structure

LoginPage

Handles authentication and login-related UI interactions.

AutomationPage

Handles Automation Anywhere navigation and workflow interactions for both use cases.

This keeps test cases focused on the business flow while page objects contain the UI logic.

Notes

Automation Anywhere Cloud is a dynamic web application, so loading time may vary.

For debugging, run tests in headed mode:

npx playwright test --project=chromium --headed

Do not include these in the final submission unless specifically required:

.env
node_modules/
test-results/
playwright-report/

Current Status

Authentication: Working

UC1: Passing

UC2 Form creation/navigation: Working

UC2 Form Designer/Text Box automation: Partially automated