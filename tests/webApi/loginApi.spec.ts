import {test, request, Page, expect} from "@playwright/test";
import { EventsPage } from "../pages/EventsPage";


let token: string;
test.beforeAll('get api session token', async ({ request }) => {
    const username: string = "store.data2026@gmail.com";
    const password: string = "Abc@1234";
    const url: string = "https://api.eventhub.rahulshettyacademy.com/api/auth/login";
    const apicontext = await request.post(url, {
        data: {
            email: username,
            password: password
        }
    });
    expect(apicontext.ok()).toBeTruthy();
    const response = await apicontext.json();
    console.log("Response: " + JSON.stringify(response));
    token = response.token;
    // console.log("Token: " + token);

});

let bookingsUrl = "https://api.eventhub.rahulshettyacademy.com/api/bookings";
test('login api test', async ({ page }) => {
    //console.log("eventhub_token: " + token);
    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, token);


    const eventName = "Hollywood Monsoon Night — Los Angeles"//"Dilli Diwali Mela";
    //await page.goto("https://eventhub.rahulshettyacademy.com/bookings");
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    
    //await page.pause();
        const p2 = {
  customerName: "abcdefgh",
  customerEmail: "abc@gmail.com",
  customerPhone: "5678964364",
  quantity: 1,
  eventId: 2
};

    const postRequest = await page.request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
        data:  p2 ,
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }
    });
    console.log("Post Request Status: " + postRequest.status());
    const postResponse = await postRequest.json();
    console.log("Post Response: " + JSON.stringify(postResponse));
    expect(postRequest.ok()).toBeTruthy();
    const bookingID = postResponse['data']['id'];
    console.log(postResponse['data']['id']);
    

    await page.goto("https://eventhub.rahulshettyacademy.com/bookings");
    await page.waitForTimeout(5000);
    const deleteurl = `https://api.eventhub.rahulshettyacademy.com/api/bookings/${bookingID}`;

    const deleteRequest = await page.request.delete(deleteurl, {
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });
    console.log("Delete Request Status: " + deleteRequest.status());

    //await page.goto("https://eventhub.rahulshettyacademy.com/events");
    //const eventCard = page.locator("[data-testid='event-card']").filter({ hasText: eventName }).first();
    //const eventCard2 = page.locator("[data-testid='event-asascard']").filter({ hasText: eventName }).first();
    
    //await expect(eventCard).toBeVisible();
    //const eventsPage = new EventsPage(page);
    //await eventsPage.clickBookNowForEvent(eventName);
    //await page.waitForTimeout(5000);
    await page.reload();
    //await page.pause();
});
