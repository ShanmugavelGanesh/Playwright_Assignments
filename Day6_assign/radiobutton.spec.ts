//create a program handle multiple rado button

import{test,expect} from "@playwright/test";

test(`learn radio button`,async ({page}) =>{
   
await page.goto(`https://leafground.com/radio.xhtml`);
await expect(page.locator('//label[contains(text(),"Safari")]/preceding::div//input[contains(@value,"Option3")]')).toBeChecked()
await expect(page.locator(`//label[contains(text(),"21-40 Years")]/preceding::div//input[contains(@value,"21-40 Years")]`)).toBeChecked()
await expect(page.locator(`(//label[contains(text(),"Edge")]/preceding::div/input[contains(@id,"idt87")])[4]`)).toBeEnabled();
await page.locator(`(//label[contains(text(),"Edge")]/preceding-sibling::div/div[contains(@class,"ui-radiobutton-box")])[1]`).click();
await page.waitForTimeout(2000)
await page.locator(`(//label[contains(text(),"Chennai")]/preceding-sibling::div/div[contains(@class,"ui-radiobutton-box")])[1]`).click();
await expect(page.locator(`//label[contains(text(),"21-40 Years")]/preceding::div//input[contains(@value,"21-40 Years")]`)).toBeChecked();
await page.locator(`//label[contains(text(),"41-60 Years")]`).click();
await expect(page.locator(`//label[contains(text(),"41-60 Years")]/preceding::div//input[contains(@value,"41-60 Years")]`)).toBeChecked();
await page.waitForTimeout(3000);


});