import test, { expect, Page } from "@playwright/test";

test('Verify file upload ', {tag: '@input'}, async({page})=>{
    await page.goto('https://www.freeconvert.com/image-converter');
    //await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3 * 1000)
    //await page.getByRole('textbox').waitFor({state: "visible"});
    //const PlusButton = page.locator('//div[@class="simplified-input-menu-container"]//button');
    //await expect(PlusButton).toBeVisible();
    //await PlusButton.click();
    const choosefile = page.locator('#upload-file-button');
    await expect(choosefile).toBeVisible();
    await choosefile.click();
    const uploadfromdevice = page.locator('//li[@class="file-input-dropdown__list__item"]//input[@data-automation-id="DeviceUploaderInput"]');
    await expect(uploadfromdevice).toBeVisible();
    await uploadfromdevice.click();
    const fileuploder = page.waitForEvent('filechooser');
    await expect(choosefile).toBeVisible();
    await choosefile.click();
    const fileChooser = await fileuploder;
    await page.waitForTimeout(4 *1000)
    await fileChooser.setFiles('/Users/sirvisettibalapavan/Downloads/role-sample-html-13.csv')
    await page.pause();

});

test('Verify file upload in gemeni',{tag: '@div'}, async({page})=>{
    await page.goto('https://gemini.google.com/app?hl=en-IN');
    await page.waitForLoadState('networkidle');
    //await page.waitForTimeout(3 * 1000)
    await page.getByRole('textbox').waitFor({state: "visible"});
    const PlusButton = page.locator('//div[@class="simplified-input-menu-container"]//button');
    await expect(PlusButton).toBeVisible();
    await PlusButton.click();
    const choosefile = page.locator('#upload-file-button');
    //await expect(choosefile).toBeVisible();
    //await choosefile.click();
    const uploadfromdevice = page.locator('//li[@class="file-input-dropdown__list__item"]//input[@data-automation-id="DeviceUploaderInput"]');
    await expect(uploadfromdevice).toBeVisible();
    await uploadfromdevice.click();
    const fileuploder = page.waitForEvent('filechooser');
    await expect(choosefile).toBeVisible();
    await choosefile.click();
    const fileChooser = await fileuploder;
    await page.waitForTimeout(4 *1000)
    await fileChooser.setFiles('/Users/sirvisettibalapavan/Downloads/role-sample-html-13.csv')
    await page.pause();

});
test('upload another with button', {tag: '@button'}, async({page})=>{
    await page.goto('https://cloudconvert.com/image-converter');
    await page.waitForLoadState('networkidle');
    const uploadbutton = page.getByRole('button', { name: 'Select File', exact: true });
    await expect(uploadbutton).toBeVisible();
    const fileuploadEvent = page.waitForEvent('filechooser');
    await uploadbutton.click();
    await page.waitForTimeout(2*1000);
    const uploadfile = await fileuploadEvent;
    await uploadfile.setFiles('/Users/sirvisettibalapavan/Downloads/role-sample-html-13.csv');
    await page.pause();
});