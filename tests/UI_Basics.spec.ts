import {expect, test} from '@playwright/test'

/*
 * Multiple fixtures are aviable 
 * browser - for new browser to configure browser with cookies or plugings
 * page - by default it will create new browser and it creates new page
 */
test('Create browser context creation test ', async({browser}) => {
    const context = await browser.newContext(); // Creates new context in browser
    const page = await context.newPage() //Setup new page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
});

test('without browser context', async({page}) =>{
    await page.goto('https://google.com')
   


});

/*Asserstions 
https://playwright.dev/docs/test-assertions
*/

test('asserstions learning', async({page}) =>{
    await page.goto('https://www.google.com/');
    console.log('page tittle', await page.title());
    //soft assertion it will not stop execution
    //await expect.soft(page).toHaveTitle('abcd')
    //hard assertion it will stop the execution 
    await expect(page).toHaveTitle('Google');
    //truthfull condition != 0 or null or false
    expect(await page.title()).toBeTruthy();
    //tobe value
    const page_title = await page.title();
    expect(page_title).toBe('Google');
    expect(page_title).not.toBe('abcd');
    //numbering expect
    const a = 5;
    expect(a).toBeGreaterThan(4);
    expect(a).toBeLessThan(6);
    expect(a).toBeLessThanOrEqual(5);
    expect(a).toBeGreaterThanOrEqual(5);
    expect(a).toBeCloseTo(5,6); //we have mention close number and it's decimal
    //tobedefined it shoundn't be undefined
    expect(a).toBeDefined();
    //contains
    expect(page_title).toContain('g');
    //for undefined
    //expect(page_title).toBeNaN();
    //for null
    //expect(page_title).toBeNull();

    //string match with regular expression
    expect(page_title).toMatch(/Google/)
    console.info('execution completed');
});

test('sample login form', async({page}) => {
    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //.fill will clear the value and fill
    const username = page.locator('#username');
    await username.fill('abc');
    await page.waitForTimeout(2 * 1000);
    //.pressSequentially append the value in input field
    await username.pressSequentially('@.com');
    //clear the input
    await username.clear();
    await username.fill('abced@gmail.com');
    const password = page.locator('#password')
    //await password.fill('asdsad')
    const signinBtn = page.locator('#signInBtn');
    //await signinBtn.click();
    //const errorMessage = page.locator("//div[@style='display: block;']")
    //console.log('error message: ', await errorMessage.textContent());
    await page.waitForTimeout(3 * 1000);
    await username.clear();
    await username.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2');
    await signinBtn.click();
    console.log('sign in button clicked')
    //await page.waitForTimeout(10 * 1000);
    const products = page.locator("//h4[@class='card-title']/a");
    await expect(products.first()).toBeVisible({timeout: 10 * 1000});
    expect(await products.count()).toBeGreaterThan(0);
    await products.first().waitFor(); // Explict wait 
    console.log('first product name: ', await products.first().textContent());
    console.log('second product name: ', await products.nth(1).textContent());
    console.log('all texts in array', await products.allTextContents());
    for(const product of await products.all()){
        console.log('product name: ',await product.textContent());
    }



});

/* Drop downs handling */

test('Dropdown', async({page}) => {
    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //.fill will clear the value and fill
    await page.waitForLoadState('networkidle');
    const username = page.locator('#username');
    await username.fill('abc');
    const password = page.locator('#password');
    await password.fill('aksdhkajdhlad');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('teach');
    console.log(await dropdown.textContent()); // Print all the options from drop down
    console.log(await dropdown.inputValue());
    //await page.pause();

});

test('handle multiple web pages', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');
    const username = await page.locator('#username').waitFor({timeout: 20 *1000});
    const link = page.locator('[href*=documents-request]');
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        link.click(),
    ])
    //console.log('all tabs :', context.pages());
    await newPage.bringToFront();
    await newPage.waitForLoadState('networkidle');
    console.log('url:', newPage.url());
    console.log('page title: ', await newPage.title())
    console.log('text : ', await newPage.locator('//h1').innerText());
    //.innerText() bring respective locator visible text [hiddent text will not come] - Slow
    //.textContent() bring complete text in that locator and child locators - hidden text also will come - Fast
   

    await newPage.getByRole('link', {'name': 'JOIN NOW'}).click();
    await newPage.waitForLoadState('networkidle');  
    await newPage.locator('#name').fill('abcdefgh');
    console.log(await newPage.locator('#name').inputValue());
    await page.locator('#username').fill('defghtakdsjdajk');
    console.log(await page.locator('#username').inputValue());
    for(const p of context.pages()){
        //await p.bringToFront();
        if(await p.title() === 'LoginPage Practise | Rahul Shetty Academy'){  
            await p.waitForTimeout(4 * 1000)
        }
        console.log('aaaa', await p.title());
    }
    console.log('old page title:')


    

});