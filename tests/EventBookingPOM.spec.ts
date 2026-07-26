import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { EventsPage } from "./pages/EventsPage";
import { BookingPage } from "./pages/BookingPage";

test("Complete event booking workflow for Dilli Diwali Mela", async ({ page }) => {
  // Test Data
  const email = "store.data2026@gmail.com";
  const password = "Abc@1234";
  const fullName = "abcdefgh";
  const phoneNumber = "1234567890";
  const eventName = "Dilli Diwali Mela";

  // Step 1: Navigate to login page
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  // Step 2: Fill email
  await loginPage.fillEmail(email);

  // Step 3: Fill password
  await loginPage.fillPassword(password);

  // Step 4: Click login button
  await loginPage.clickLoginButton();

  // Step 5: Wait for home page
  await loginPage.waitForHomePage();
  console.log("✓ Successfully logged in");

  // Step 6: Click on Events and wait for upcoming events
  const eventsPage = new EventsPage(page);
  await eventsPage.clickEventsLink();
  await eventsPage.waitForUpcomingEvents();
  console.log("✓ Navigated to Events page");

  // Step 7: Click Book Now button for Dilli Diwali Mela
  const eventExists = await eventsPage.verifyEventExists(eventName);
  expect(eventExists).toBeTruthy();
  await eventsPage.clickBookNowForEvent(eventName);
  console.log(`✓ Clicked Book Now for ${eventName}`);

  // Step 8: Fill Full Name
  const bookingPage = new BookingPage(page);
  await bookingPage.fillFullName(fullName);

  // Step 9: Fill Email
  await bookingPage.fillEmail(email);

  // Step 10: Fill Phone Number
  await bookingPage.fillPhoneNumber(phoneNumber);

  // Step 11: Click Confirm Booking button
  await bookingPage.clickConfirmBookingButton();

  // Verify booking confirmation
  await bookingPage.waitForBookingConfirmation();
  const confirmationMessage = await bookingPage.getBookingConfirmationMessage();
  expect(confirmationMessage).toBeTruthy();
  console.log("✓ Booking confirmed successfully!");
});
