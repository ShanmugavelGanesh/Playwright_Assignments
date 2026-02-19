import { test, expect } from '@playwright/test';
test('Launch two open browsers open Redbus and Flipkart URL and verify the page title in URL', async ({page}) => {
await page.goto('https://www.redbus.in/');
const redbusTitle = await page.title();
console.log(`Redbus Page Title: ${redbusTitle}`);
expect(redbusTitle).toContain('Bus Booking Online and Train Tickets at Lowest Price - redBus');
await page.goto('https://www.flipkart.com/');
const flipkartTitle = await page.title();
console.log(`Flipkart Page Title: ${flipkartTitle}`);
expect(flipkartTitle).toBe('Online Shopping India Mobile, Cameras, Lifestyle & more Online @ Flipkart.com');
});
