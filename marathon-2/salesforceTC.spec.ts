//Marathon 2 - Test case -2: Create lead and convert the lead
import { test, chromium, expect } from "@playwright/test";

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
await page.locator(`//input[@placeholder="Search apps or items..."]`).fill('Marketing');
await page.locator(`//p[contains(text(),"CRM Classic")]`).click();
await page.locator(`(//div[contains(@class,"slds-context")])[8]`).click();
await page.getByRole('menuitem', { name: 'New Lead' }).click();
await page.waitForTimeout(2000);
await page.getByRole('combobox',{name: 'Salutation'}).click();
await page.getByRole('option',{name: 'Mr.'}).click();
const firstName="New_Lead_Insert";
await page.getByRole('textbox',{name: 'First Name'}).fill(firstName);
await page.getByRole('textbox',{name: 'Last Name'}).fill('G');
await page.getByRole('textbox',{name: 'Company'}).fill('Finance Company');
await page.getByRole('button',{name: 'Save',exact :true}).click();
await expect(page.locator(`//span[contains(@class,"toastMessage ")]`)).toBeVisible();
const leadCreate=await page.locator(`//span[contains(@class,"toastMessage ")]`).innerText();
Promise.all([expect(leadCreate).toContain('Lead'),expect(leadCreate).toContain('was created')])
console.log(leadCreate);
await page.getByRole('link', { name: 'Leads' }).click();
await page.locator(`(//input[@type="search"])[2]`).fill(firstName)
await page.locator(`(//input[@type="search"])[2]`).press('Enter');
await page.waitForTimeout(2000);
await page.locator(`(//div[@class="slds-truncate"])[1]/ancestor::td/following-sibling::th/span/div`).click();
await page.waitForTimeout(2000);
await page.getByRole('button',{name: 'Convert'}).click();
// await page.getByLabel('Opportunity Name').clear();
const oppNameField = await page.locator(`(//div[contains(@class,"createPanelCollapsed")])[3]`)

await oppNameField.click({ force: true });
await page.keyboard.press('Control+A'); // Select all text
await page.keyboard.press('Backspace');
const Opp_Name='FR_LEAD_CONV';
await page.getByRole('textbox',{name: 'Opportunity Name '}).fill(Opp_Name);
await page.getByRole('button',{name: 'Convert'}).click();
const leadconv=await page.getByText("Your lead has been converted",{exact:true}).innerText();
console.log(leadconv)
expect(leadconv).toContain('converted');
await page.getByRole('button',{name: 'Go to Leads'}).click();
await page.getByRole('link', { name: 'Opportunities' }).click();
const search=await page.getByPlaceholder('Search this list...',{exact:true})
search.click();
search.fill(Opp_Name);
search.press('Enter');
if(await expect(page.locator(`(//div[@class="slds-truncate"])[1]/ancestor::td/following-sibling::th/span/div`)).toBeVisible){
    await page.waitForTimeout(2000);
    console.log('Lead converted as expected')
    await page.locator(`(//div[@class="slds-truncate"])[1]/ancestor::td/following-sibling::th/span/div`).click();
}else{
    console.log('Lead not converted properly')
}
const actualOPP=await page.locator(`//div[contains(@class,"entityNameTitle ")]/following-sibling::slot/lightning-formatted-text`).innerText();

expect(actualOPP).toContain(Opp_Name);
await page.waitForTimeout(3000);
});