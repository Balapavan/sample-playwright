import {test,  expect} from '@playwright/test';

test('valudate pops', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.waitForLoadState('networkidle');
    const alertButton = page.locator('#alertbtn');
    await expect(alertButton).toBeVisible();

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe('Hello , share this practice page and share your knowledge');
        await dialog.accept();
    });
    await alertButton.click();
    
    
    const confimCancel = page.locator('#confirmbtn');
    await expect(confimCancel).toBeVisible();
    /* First we need listerner in playwright 
    If clik performed befor elisterner then it will freeze the browser and execution will halt
    */
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe('Hello , Are you sure you want to confirm?');
        await dialog.dismiss();
        });
    await confimCancel.click();

    

})