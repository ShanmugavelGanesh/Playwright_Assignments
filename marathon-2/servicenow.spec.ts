//Marathon 2 - Test Case 1 - Write a program for the place the order in service now portal 
import {test,expect} from "@playwright/test";
import path from "path";

test(`service Now`,async ({page})=>{
await page.goto(`https://dev274283.service-now.com/`);    
await page.getByRole('textbox',{name : 'User name'}).fill('admin');
await page.getByRole('textbox',{name : 'Password'}).fill('M7Afl8Nj-B^j');
await page.getByRole('button',{name : 'Log in'}).click();
await page.waitForLoadState("domcontentloaded");
await page.waitForTimeout(3000);
await page.locator(`//div[contains(text(),"ServiceNow Studio")]`).isVisible();
await page.getByRole('menuitem',{name:'All'}).click();
await page.getByRole('link',{name: 'Service Catalog 3 of 23'}).click();
await page.waitForTimeout(3000);
const frame=page.frameLocator(`[id="gsft_main"]`);
frame.getByRole('link',{name : 'Mobiles. Cell phones to meet your business needs.'}).nth(1).click();
await page.waitForTimeout(2000);
await page.locator(`(//img[contains(@alt,"Request for Apple iPhone 13")])[2]/parent::div`).isVisible();
const mainFrame = page.frameLocator('#gsft_main');
await mainFrame.getByRole('link', { name: 'Apple iPhone 13', exact: true }).click();
const mframe=page.frameLocator(`[id="gsft_main"]`);
await mframe.locator(`(//span[@class="input-group-radio"])[1]`).click();
// await mframe.locator(`//div[contains(@class,"sc-form-field")]/input[contains(@class,"cat_item_option")]`).nth(2).fill('7867563434');
await mframe.getByRole('textbox',{name:'    What was the original phone number?'}).fill('56453356677')
await mframe.locator(`(//select[contains(@class,"form-control")])[1]`).selectOption({index:2})
await mframe.locator(`(//span[@class="input-group-radio"])[6]`).click();
await mframe.locator(`(//span[@class="input-group-radio"])[11]`).click();
await mframe.getByRole('button',{name:'Order Now'}).click();
const lframe=page.frameLocator('#gsft_main');
await expect(lframe.getByText(`Thank you, your request has been submitted`)).toBeVisible();
await page.screenshot({path:'order-confirmation.png', fullPage:true});
await page.waitForTimeout(3000);
});