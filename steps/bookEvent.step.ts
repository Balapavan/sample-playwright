import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';





Before(async function () {
  this.browser = await chromium.launch({headless:false});
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.page.goto("https://eventhub.rahulshettyacademy.com/login");
  await this.page.waitForLoadState('networkidle');

  
})

After(async function name() {

  await this.browser.close();

})

Given('a user logins to application with {string} and {string}', async function (username:string, password:string) {
  // Write code here that turns the phrase above into concrete actions
   // 2. Fill email
    await this.page.getByRole('textbox', { name: 'email' }).fill('store.data2026@gmail.com');
    
    // 3. Fill password
    await this.page.getByRole('textbox', { name: 'password' }).fill('Abc@1234');
    
    // 4. Click login button
    await this.page.locator('#login-btn').click();
    
    // 5. Wait for home page
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();


  //return 'pending';
});

When('navigate to events page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.waitForTimeout(3 * 1000);
  await this.page.getByRole('link', { name: 'Events' , exact: true}).click();
  //return 'pending';
});

Then('Click on booking button for {string}', async function (EventName: string) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.waitForLoadState('networkidle');
  console.log('Click on booking button for:', EventName)  
    // 7. Click 'Book Now' button for 'Dilli Diwali Mela'
  const eventCard = this.page.locator('[data-testid="event-card"]').filter({ hasText: EventName });
  await eventCard.getByRole('link', { name: 'Book Now' }).click();
  //return 'pending';
});

Then('fill user details {string} {string}', async function (fullName:string, phoneNumber:string) {
  // 8. Fill Full Name
    await this.page.getByLabel('Full Name').fill('abcdefgh');
    
    // 9. Fill email
    await this.page.getByPlaceholder('you@email.com').fill('store.data2026@gmail.com');
    
    // 10. Fill Phone Number
    await this.page.getByLabel('Phone Number').fill('1234567890');
    //await this.page.pause();
  //return 'pending';
});