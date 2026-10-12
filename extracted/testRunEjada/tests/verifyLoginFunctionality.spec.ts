import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
const users = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    type: 'Valid user',
    shouldLogin: true,
  },
  {
    username: 'invalid_user',
    password: 'wrong_password',
    type: 'Invalid user',
    shouldLogin: false,
    error: 'Username and password do not match',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    type: 'Blocked user',
    shouldLogin: false,
    error: 'Sorry, this user has been locked out',
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    type: 'Problem user',
    shouldLogin: true,
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    type: 'Performance issue user',
    shouldLogin: true,
  },
];

test.describe('Login functionality', () => {
  for (const user of users) {
    test(`Validate login - ${user.type}`, async ({ page }) => {
      await page.goto('/')
      const loginPage = new LoginPage(page);
      await loginPage.login(user.username, user.password);

      if (user.shouldLogin) {
        await loginPage.verifySuccessfulLogin();
      } else {
        await loginPage.verifyLoginError(user.error!);
      }
    });
  }
});