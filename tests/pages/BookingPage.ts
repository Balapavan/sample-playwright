import { Page, expect } from "@playwright/test";

export class BookingPage {
  readonly page: Page;
  readonly fullNameInput = "input[placeholder*='Full Name'], label:has-text('Full Name') + input";
  readonly emailInput = "input[placeholder='you@email.com']";
  readonly phoneNumberInput = "input[label*='Phone'], label:has-text('Phone Number') + input";
  readonly confirmBookingButton = "#confirm-booking";
  readonly bookingConfirmationMessage = "text=Booking Confirmed! 🎉";

  constructor(page: Page) {
    this.page = page;
  }

  async fillFullName(fullName: string) {
    await this.page.getByLabel("Full Name").fill(fullName);
  }

  async fillEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.page.getByLabel("Phone Number").fill(phoneNumber);
  }

  async clickConfirmBookingButton() {
    await this.page.locator(this.confirmBookingButton).click();
  }

  async waitForBookingConfirmation() {
    await this.page.getByText("Booking Confirmed! 🎉").isVisible();
    await this.page.waitForLoadState("networkidle");
  }

  async fillBookingDetails(fullName: string, email: string, phoneNumber: string) {
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillPhoneNumber(phoneNumber);
    await this.clickConfirmBookingButton();
    await this.waitForBookingConfirmation();
  }

  async getBookingConfirmationMessage() {
    return await this.page.getByText("Booking Confirmed! 🎉").isVisible();
  }
}
