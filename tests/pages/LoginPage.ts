import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput = "input[placeholder='you@email.com']";
  readonly passwordInput = "input[placeholder='••••••']";
  readonly loginButton = "button:has-text('Sign In')";
  readonly homeLink = "a[href='/']";

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
    await this.page.waitForLoadState("networkidle");
  }

  async fillEmail(email: string) {
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  async waitForHomePage() {
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("//a[text()= 'Home']").waitFor({ state: "visible", timeout: 15000 });
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.waitForHomePage();
  }

  async isLoginSuccessful() {
    return await this.page.getByRole("link", { name: "Home" }).isVisible();
  }
}
