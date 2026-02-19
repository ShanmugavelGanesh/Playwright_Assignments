//Create script for merge lead in leaftap domain

import { test, expect } from "@playwright/test";

test(`Test to launch browser and perform actions`, async ({page}) => {

    await page.goto(`http://leaftaps.com/opentaps/control/main`);

    page.once("dialog",async(alert)=>{
    const altertype=await alert.type();
    console.log(`Alter type is : ${altertype}`)
    await alert.accept();
 })   
 
    await page.locator(`#username`).fill('Demosalesmanager');
    await page.locator(`#password`).fill('crmsfa');
    await page.locator(`.decorativeSubmit`).click() 
    // await page.locator(`text=CRM/SFA`).click()
    await page.getByRole('link',{name: 'CRM/SFA'}).click();
    await page.getByRole('link',{name: 'Leads'}).click();
    await page.getByRole('link',{name: 'Merge Leads'}).click();
    
    const fromID = page.locator('//input[@id="ComboBox_partyIdFrom"]');
    await expect(fromID).toBeVisible();
    await fromID.click({force:true});
    await page.keyboard.type('10161')
    await page.keyboard.press('Enter')

    const toID = page.locator('//input[@id="ComboBox_partyIdTo"]');
    await expect(toID).toBeVisible();
    await toID.click({force:true});
    await page.keyboard.type('10162')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2000)
    await page.locator(`//a[text()="Merge"]`).click()
    // await page.getByRole('link',{name: 'Merge'}).click({force:true});
    await expect(page).toHaveTitle(/View Lead/);
     await page.waitForTimeout(4000);
});