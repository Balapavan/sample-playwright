import { test } from '@playwright/test'

test('Role based locators practice', async({page}) =>{
    page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.waitForLoadState('networkidle');
    const genter = page.getByLabel('Gender');
    await genter.selectOption('Female');
    const passsword = page.getByRole('textbox', {name: 'password'})
    await passsword.fill('aaaaaaabbbcskjflkajf')
    //await genter.click();
    await page.getByRole('button', {name:'Submit'}).click();
    

    //await page.getByRole('textbox', {name:'email'}).fill('nameeeeeeee')
    await page.waitForTimeout(3 * 1000);
    //await page.pause();

});