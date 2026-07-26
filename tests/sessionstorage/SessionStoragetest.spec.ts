import {test, expect, BrowserContext, request} from '@playwright/test'

let newBrowserContext: BrowserContext;

test.beforeAll( async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
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

    await context.storageState({path: 'auth.json'});
    newBrowserContext = await browser.newContext({storageState: 'auth.json'})

});

test('verify event page', async() =>
{
   console.log('todo test') 
   const page = await newBrowserContext.newPage();
   await page.goto('https://eventhub.rahulshettyacademy.com/events');
   const eventCard = page.locator('[data-testid="event-card"]').filter({ hasText: 'Dilli Diwali Mela' });
    await eventCard.getByRole('link', { name: 'Book Now' }).click();
    await page.waitForTimeout(3*1000);

});

test('with new browser context', {tag: '@smoke'}, async({browser})=>{
    const context = await browser.newContext({storageState: 'auth.json'});
    const page = await context.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/events');
   const eventCard = page.locator('[data-testid="event-card"]').filter({ hasText: 'Dilli Diwali Mela' });

    const responsePromise = await page.waitForResponse('https://eventhub.rahulshettyacademy.com/events/*')
    
    await eventCard.getByRole('link', { name: 'Book Now' }).click();
    const response = await responsePromise;
    console.log(response.ok());
    
    await page.getByLabel('Full Name').fill('abcdefgh');
    
    // 9. Fill email
    await page.getByPlaceholder('you@email.com').fill('store.data2026@gmail.com');
    
    // 10. Fill Phone Number
    await page.getByLabel('Phone Number').fill('1234567890');
    const image = await page.screenshot();
    test.info().attach('screenshot', { body: image, contentType: 'image/png' });
    test.info().attach('information', {body: 'hello attach', contentType: 'text/plain'})
    await page.waitForTimeout(2*1000);
    //test.info().fail();
    

})