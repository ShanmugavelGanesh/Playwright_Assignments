//Edit the lead created in the previous test case

import { test, chromium } from "@playwright/test";  
test(`Test to launch browser and perform actions`, async ({page}) => {
    await page.goto(`http://leaftaps.com/opentaps/control/main`);
    await page.locator(`#username`).fill('Demosalesmanager');
    await page.locator(`#password`).fill('crmsfa');
    await page.locator(`.decorativeSubmit`).click()
    await page.locator(`text=CRM/SFA`).click()
    await page.locator(`(//div[@class='frameSectionHeader']/following::a)[1]`).click()
    await page.locator(`(//ul[@class='shortcuts']//a)[3]`).click()  
    // value from previous test case create-browser.spec.ts call the leadname value here
    await page.locator(`//input [@name="id"]`).fill('11106')
    await page.locator('//button[text()="Find Leads"]').click()
    await page.locator(`//a[text()='11106']`).click();
    await page.locator(`//a[text()="Edit"]`).click()
    await page.locator(`#updateLeadForm_companyName`).fill('TestLeaf_Updated');
    await page.locator(`#updateLeadForm_firstName`).fill('Guru_Updated');
    await page.locator(`#updateLeadForm_lastName`).fill('G_Updated');
    await page.waitForTimeout(2000);
    await page.locator(`(//input[@class="smallSubmit"])[1]`).click();
    await page.waitForTimeout(4000);
    const updatedname = await page.locator(`#viewLead_companyName_sp`).textContent();
    console.log(`Updated Lead Name is: ${updatedname}`);
    await page.waitForTimeout(4000);
});