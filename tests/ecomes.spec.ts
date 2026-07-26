import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { EventsPage } from "./pages/EventsPage";
import { BookingPage } from "./pages/BookingPage";



test("Book Dilli Diwali Mela event end to end", async ({ page }) => {
  const email = "store.data2026@gmail.com";
  const password = "Abc@1234";
  const fullName = "abcdefgh";
  const phoneNumber = "1234567890";
  const eventName = "Hollywood Monsoon Night — Los Angeles"//"Dilli Diwali Mela";

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
  await loginPage.clickLoginButton();
  await loginPage.waitForHomePage();
  await expect(page.locator("//a[text()= 'Home']")).toBeVisible();

  const eventsPage = new EventsPage(page);
  await eventsPage.clickEventsLink();
  await eventsPage.waitForUpcomingEvents(eventName);
  const eventCard = page.locator("[data-testid='event-card']").filter({ hasText: eventName }).first();
  await expect(eventCard).toBeVisible();
  await eventsPage.clickBookNowForEvent(eventName);

  const bookingPage = new BookingPage(page);
  await bookingPage.fillFullName(fullName);
  await bookingPage.fillEmail(email);
  await bookingPage.fillPhoneNumber(phoneNumber);
  await bookingPage.clickConfirmBookingButton();
  await bookingPage.waitForBookingConfirmation();
  await expect(page.getByText("Booking Confirmed! 🎉")).toBeVisible();
});
