// create individuals

import { test, chromium } from "@playwright/test";

test(`Test to launch browser and perform actions`, async ({page}) => {
await page.goto(`https://testleaf.my.salesforce.com/`);
await page.locator(`#username`).fill('dilipkumar.rajendran@testleaf.com');
await page.locator(`#password`).fill('TestLeaf@2025');
await page.locator(`#Login`).click();
await page.waitForTimeout(4000);
await page.locator(`.slds-icon-waffle`).click();
await page.locator(`//lightning-button[@variant="base"]/button`).click();
await page.locator('//button[@title="Cancel and close"]').click();
await page.locator(`.slds-icon-waffle`).click();
await page.locator(`//lightning-button[@variant="base"]/button`).click();
await page.locator(`//input[@placeholder="Search apps or items..."]`).fill('Individuals');
await page.locator(`//mark[text()="Individuals"]`).click();
await page.waitForTimeout(2000);
await page.locator(`//div[@title="New"]`).click();
await page.waitForTimeout(2000);
await page.locator(`//div[contains(@class,'salutation')]//a[@role="combobox"]`).click();
await page.locator(`//a[@title="Mr."]`).click();
const firstName = await page.locator(`//input[contains(@class,"firstName")]`).fill('Dilip');
await page.locator(`//input[contains(@class,"lastName")]`).fill('Kumar');
await page.locator(`(//button[@title="Save"])[2]`).click();
await page.waitForTimeout(4000);
const userlocator = await page.locator(`(//a[contains(@class,"outputLookupLink") and text()="Dilip Kumar"])[2]`)
const individualname = await userlocator.textContent();
console.log(`Created Individual Name is: ${individualname}`);
await page.waitForTimeout(4000);
});