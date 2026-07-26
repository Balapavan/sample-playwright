import { Page, expect, test } from "@playwright/test";

let username : string = 'store.data2026@gmail.com';
let passsword : string = 'Abc@1234';
let sharedPage : Page;
let BASE_URL = 'https://eventhub.rahulshettyacademy.com'

let FULL_NAME = 'abcedefgh';
let PHONE_NUMBER = '1111112345';

async function login(page_obj: any, username: string, passsword: string) {
    console.log(`login started ${page_obj} ${username} ${passsword}`)
    await page_obj.getByRole('textbox', {name: 'email'}).fill(username);
    await page_obj.getByRole('textbox', {name : 'password'}).fill(passsword);
    const loginbutton = page_obj.locator('#login-btn')
    await expect(loginbutton).toBeVisible();
    await loginbutton.click();
    await page_obj.waitForLoadState('networkidle');
    await page_obj.getByRole("link", {name : 'Home'}).isVisible({timeout: 10_1000});  
    //await page_obj.pause();
}

test.beforeEach('Launch application', async({browser}) =>{
    sharedPage = await browser.newPage();
    await sharedPage.goto(BASE_URL + '/login');
    await sharedPage.waitForLoadState('networkidle');
    await login(sharedPage, username, passsword);
    
 
})
const booking_cout = [
    {'no_of_tickets': 1, 'refund': true},
    {'no_of_tickets': 3, 'refund': false}];
for(const testdata of booking_cout){
test(`Refund eligibility check for ${testdata.no_of_tickets}`, async({}, testInfo) => {
    console.log(`${BASE_URL}/events`, testdata.refund)
    await sharedPage.waitForTimeout(5_000)
    await sharedPage.goto(`${BASE_URL}/events`);
    const eventIds = sharedPage.locator('#event-card');
    await expect(eventIds.first()).toBeVisible();
    const bookEvent = eventIds.first().getByRole('link', {name:'Book Now'});
    await bookEvent.click();
    await sharedPage.getByLabel('Full Name').fill(FULL_NAME);
    await sharedPage.getByPlaceholder('you@email.com').fill(username);
    await sharedPage.getByLabel('Phone Number').fill(PHONE_NUMBER);
    for(let i: number = 0; i < testdata.no_of_tickets; i++){
        const ticket_count_from_ui : number = Number(await sharedPage.locator('#ticket-count').textContent());
        console.log(ticket_count_from_ui, testdata.no_of_tickets);
        if (ticket_count_from_ui != testdata.no_of_tickets){
            await sharedPage.getByRole('button', {name:'+'}).click();
        } 
    }
    await sharedPage.locator('#confirm-booking').click();
    await expect(sharedPage.getByText('Booking Confirmed! 🎉')).toBeVisible({timeout: 10_000});
    //const event_title = await sharedPage.getByRole('heading', {level:1}).innerText()
    const bookingRef  = await sharedPage.locator('.booking-ref').textContent();
    console.log('ref number : ', bookingRef)

    const mybookings = sharedPage.getByText('EventHubHomeEventsMy')
             .getByRole('link', {name:'My Bookings'});
        await mybookings.click();
        await expect(sharedPage).toHaveURL(/\/bookings$/);
    //const event_title = await sharedPage.getByRole('heading', {level:1}).innerText();
    //expect(event_title.charAt(0)).toEqual(bookingRef?.charAt(0));
    const booking_cards = sharedPage.locator('#booking-card');
    await expect(booking_cards.first()).toBeVisible();
    
    const targetedcard = booking_cards.filter({hasText: String(bookingRef)});
    const event_name = await targetedcard.getByRole('heading', {level: 3}).innerText()
    console.log(bookingRef, event_name);

    expect(String(bookingRef).charAt(0)).toEqual(event_name.charAt(0));
    const view_detailsbtn = targetedcard.getByRole('button', { name: 'View Details' });
    await view_detailsbtn.click();
    //Check eligibility refund 
    
    const refund_button = sharedPage.getByRole('button', {name:'Check eligibility for refund?'});
    await expect(refund_button).toBeVisible();
    await refund_button.click();
    const spinner = sharedPage.locator('#refund-spinner');
    await expect(spinner).toBeHidden({timeout: 7_1000});

    const refund_result= sharedPage.locator('#refund-result');
    await expect(refund_result).toBeVisible();

    if (testdata.refund){
        expect(refund_result).toContainText('Single-ticket bookings qualify for a full refund.');
    }
    else{
        expect(refund_result).toContainText('Not eligible for refund');
    }

    test.info().attach('test info' , {body: JSON.stringify(testdata, null, 2), contentType: 'application/json'})

});
}