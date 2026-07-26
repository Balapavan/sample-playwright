import { Page, test, expect} from "@playwright/test";


let username : string = 'store.data2026@gmail.com';
let passsword : string = 'Abc@1234';

let sharedPage : any;
const timestamp: number = Date.now(); 

test.beforeAll('Launch web page and logiin user', async({browser}) =>{
    sharedPage = await browser.newPage();
    sharedPage.goto('https://eventhub.rahulshettyacademy.com/login');
    await sharedPage.waitForTimeout(3 * 1000);
    await sharedPage.getByRole('textbox', {name: 'email'}).clear();
    await sharedPage.getByRole('textbox', {name: 'email'}).fill(username);
    await sharedPage.getByRole('textbox', {name : 'password'}).clear();
    await sharedPage.getByRole('textbox', {name : 'password'}).fill(passsword);
    const loginbutton = await sharedPage.locator('#login-btn')
    expect(loginbutton).toBeVisible();
    await loginbutton.click();  
    //await sharedPage.pause();
    await sharedPage.waitForLoadState('networkidle');
    await sharedPage.getByRole("link", {name : 'Home'}).isVisible({timeout: 10_1000});
});

test('Create Event and verify the event booking', async() => {
    
    const event_link = sharedPage.getByText('EventHubHomeEventsMy')
         .getByRole('link', {name:'Events'});
    await event_link.click();

    await sharedPage.getByRole('button', {name:'Add New Event'}).click();
    const event_name = 'testing event ' + String(timestamp);
    const event_description = 'Testing for creating new event';
    const catagery = 'Sports';
    const city = 'Hyderabad';
    const adress = 'kondapur';
    const price = '23'
    const total_seats : number = 50;
    await sharedPage.waitForTimeout(3 * 1000);
    await sharedPage.getByTestId('event-title-input').fill(event_name);
    await sharedPage.getByRole('textbox', {name: 'Describe the event…'}).fill(event_description);
    const dropdown = await sharedPage.locator('#category');
    await dropdown.selectOption(catagery);
    await sharedPage.getByLabel('City').fill(city);
    await sharedPage.getByLabel('Venue').fill(adress);
    await sharedPage.getByLabel('Price ($)').fill(price);
    await sharedPage.getByRole('spinbutton', { name: 'Total Seats*' }).fill(String(total_seats));
    await sharedPage.getByRole('textbox', { name: 'Event Date & Time*' }).click();
    await sharedPage.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-07-11T16:46');

    await sharedPage.getByRole('button', {name: '+ Add Event'}).click();
    await sharedPage.getByText('Event created!').isVisible();
    await event_link.click();
    await sharedPage.waitForLoadState('networkidle');
    const evet_cards = sharedPage.getByTestId('event-card');
    expect(await evet_cards.first()).toBeVisible();
    const right_event = evet_cards.filter({hasText: event_name});
    expect(await right_event).toBeVisible({timeout : 5_000});

    const Seatsinfo = await evet_cards.filter({hasText: event_name}).locator('span', { hasText : 'seats available'});
    const seatstext = await Seatsinfo.textContent(); 
    const seatsBeforeBooking = parseInt(seatstext.match(/\d+/)[0], 10);

    console.log('Before booking Seats number : ',seatsBeforeBooking);
    await evet_cards.filter({hasText: event_name}).getByRole('link', {name:'Book Now'}).click();
    await sharedPage.getByLabel('Full Name').fill('aaaaaaaaa');
    await sharedPage.getByPlaceholder('you@email.com').fill(username);
    await sharedPage.getByLabel('Phone Number').fill('0000000000');
    await sharedPage.locator('#confirm-booking').click();
    await sharedPage.getByText('Booking Confirmed! 🎉').isVisible();
    const bookingRef = await sharedPage.locator('.booking-ref').textContent();
    console.log('ref number : ', bookingRef)
    const mybookings = sharedPage.getByText('EventHubHomeEventsMy')
         .getByRole('link', {name:'My Bookings'});
    await mybookings.click();
    await expect(sharedPage).toHaveURL(/\/bookings$/);
    const bookingIds = sharedPage.locator('#booking-card');
    await expect(bookingIds.first()).toBeVisible();
    console.log('reference number displayed', await bookingIds.filter({hasText :bookingRef}).isVisible());
    expect(await bookingIds.locator('.booking-ref').filter({hasText :bookingRef})).toBeVisible();

    await event_link.click();
    await sharedPage.waitForLoadState('networkidle');
    await sharedPage.waitForTimeout(2_000);
    const event_cards = sharedPage.locator('#event-card');
    const events_status = await event_cards.first().isVisible();
    console.log('events_status: ', events_status)
    console.log('events count ', event_cards.count());
    const seats_after = await event_cards.filter({hasText: event_name}).locator('span', { hasText : 'seats available'})
    expect(await seats_after).toBeVisible();
    const seatstextafter = await Seatsinfo.textContent(); 
    const seatsAfterBooking = parseInt(seatstextafter.match(/\d+/)[0], 10);
    console.log('Seats after booking : ', seatsAfterBooking)
    expect(seatsAfterBooking).toEqual(seatsBeforeBooking - 1);




    
});