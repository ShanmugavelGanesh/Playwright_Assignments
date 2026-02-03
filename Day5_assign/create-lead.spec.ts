//Create Lead Test Script using Playwright and TypeScript

import { test, chromium } from "@playwright/test";

test(`Test to launch browser and perform actions`, async ({page}) => {

    await page.goto(`http://leaftaps.com/opentaps/control/main`);
    await page.locator(`#username`).fill('Demosalesmanager');
    await page.locator(`#password`).fill('crmsfa');
    await page.locator(`.decorativeSubmit`).click() 
    await page.locator(`text=CRM/SFA`).click()
    await page.locator(`(//div[@class='frameSectionHeader']/following::a)[1]`).click()
    await page.locator(`(//ul[@class='shortcuts']//a)[2]`).click()
    await page.locator(`#createLeadForm_companyName`).fill('crmsfa');
    await page.locator(`#createLeadForm_firstName`).fill('Guru');
    await page.locator(`#createLeadForm_lastName`).fill('G');
    await page.locator(`#createLeadForm_personalTitle`).fill('Guru_Lead');
    await page.locator(`#createLeadForm_generalProfTitle`).fill('New_TestLead');
    await page.locator(`#createLeadForm_annualRevenue`).fill('10 LPA');
    await page.locator(`#createLeadForm_departmentName`).fill('Account  Dept');
    await page.locator(`#createLeadForm_primaryPhoneNumber`).fill('9876543211');
    await page.locator(`.smallSubmit`).click()
    await page.waitForTimeout(4000);
    const leadname = await page.locator(`#viewLead_companyName_sp`).textContent();
    console.log(`Created Lead Name is: ${leadname}`);
    await page.waitForTimeout(4000);
});