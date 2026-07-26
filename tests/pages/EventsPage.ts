import { Page, expect } from "@playwright/test";

export class EventsPage {
  readonly page: Page;
  readonly eventsLink = "a:has-text('Events')";
  readonly eventCard = "[data-testid='event-card']";
  readonly bookNowButton = "button:has-text('Book Now')";

  constructor(page: Page) {
    this.page = page;
  }

  async clickEventsLink() {
    await this.page.getByRole("link", { name: "Events", exact: true }).click();
    await this.page.waitForLoadState("networkidle");
  }

  async waitForUpcomingEvents(eventName?: string) {
    await this.page.waitForLoadState("networkidle");
    const targetCard = eventName
      ? this.page.locator(this.eventCard).filter({ hasText: eventName }).first()
      : this.page.locator(this.eventCard).first();
    await targetCard.waitFor({ state: "visible", timeout: 15000 });
  }

  async clickBookNowForEvent(eventName: string) {
    const eventCard = this.page.locator(this.eventCard).filter({ hasText: eventName });
    const bookNowBtn = eventCard.getByRole("link", { name: "Book Now" });
    await bookNowBtn.first().click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyEventExists(eventName: string) {
    const eventCard = this.page.locator(this.eventCard).filter({ hasText: eventName }).first();
    return await eventCard.isVisible();
  }
}
