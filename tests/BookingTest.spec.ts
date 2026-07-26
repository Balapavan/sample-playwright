import { Page, test, expect } from "@playwright/test";

test('Book Event - Dilli Diwali Mela', async ({ page }) => {
    // 1. Goto login page
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    
    // 2. Fill email
    await page.getByRole('textbox', { name: 'email' }).fill('store.data2026@gmail.com');
    
    // 3. Fill password
    await page.getByRole('textbox', { name: 'password' }).fill('Abc@1234');
    
    // 4. Click login button
    await page.locator('#login-btn').click();
    
    // 5. Wait for home page
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    // 6. Click on 'Events' and wait for upcoming events
    await page.getByRole('link', { name: 'Events' }).click();
    await page.waitForLoadState('networkidle');
    
    // 7. Click 'Book Now' button for 'Dilli Diwali Mela'
    const eventCard = page.locator('[data-testid="event-card"]').filter({ hasText: 'Dilli Diwali Mela' });
    await eventCard.getByRole('link', { name: 'Book Now' }).click();
    
    // 8. Fill Full Name
    await page.getByLabel('Full Name').fill('abcdefgh');
    
    // 9. Fill email
    await page.getByPlaceholder('you@email.com').fill('store.data2026@gmail.com');
    
    // 10. Fill Phone Number
    await page.getByLabel('Phone Number').fill('1234567890');
    
    // 11. Click 'Confirm Booking' button
    await page.locator('#confirm-booking').click();
    
    // Verify booking confirmation
    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
});
