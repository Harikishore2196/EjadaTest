# EjadaTest – Playwright Automation Framework

## Overview

EjadaTest is a UI test automation project built using **Playwright and TypeScript**. It follows the **Page Object Model (POM)** design pattern to improve code reusability, maintainability, and test organization.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Page Object Model (POM)

## Project Structure

```text
EjadaTest/
├── extracted/
│   └── testRunEjada/
│       ├── pages/                
│       ├── tests/                 
│       ├── playwright.config.ts   
│       ├── package.json          
│       └── ...
└── README.md
```

*Note: Update the structure above to match the actual folders and files in your project.*

## Prerequisites

- Node.js and npm
- Git
- A supported browser installed through Playwright

## Installation

Navigate to the project directory:

```bash
cd extracted/testRunEjada
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers if required:

```bash
npx playwright install
```

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

View the HTML report:

```bash
npx playwright show-report
```

## Design Pattern

The project uses the Page Object Model (POM), where page-specific locators and actions are maintained in separate page classes, keeping test scripts organized and reusable.

## Author

Harikishore

## License

No license has been specified yet.