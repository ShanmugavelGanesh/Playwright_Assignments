//Write program for the checkbox on the given scenari   
import { test, expect } from "@playwright/test";
test(`Test to launch browser and perform actions`, async ({page}) => {
   await page.goto(`https://leafground.com/checkbox.xhtml`);
   await page.waitForTimeout(2000);
   //Verify the Basic checkbox
   await page.locator(`((//div[contains(@class,"formgrid")])[1]//div[contains(@class,"chkbox")])[2]`).click();
   const basic=await page.locator(`(//div[contains(@class,"formgrid")])[1]//input[@aria-label="Basic"]`); 
   await expect(basic).toBeChecked();

   //Verify the Notifications checkbox
   await page.locator(`((//div[contains(@class,"formgrid")])[2]//div[contains(@class,"chkbox")])[2]`).click();
   const notification=await page.locator(`(//div[contains(@class,"formgrid")])[2]//input[@aria-label="Ajax"]`);
   await expect(notification).toBeChecked();

   //Verify that the expected message is displayed
   await expect(page.locator('(//div[contains(@class,"ui-growl-message")])')).toBeVisible();
   const notiyMessage=await page.locator('//div[contains(@class,"ui-growl-message")]/span[@class="ui-growl-title"]');
   const notifyText=await notiyMessage.textContent();
   console.log(`Notification message displayed is: ${notifyText}`);
   await page.waitForTimeout(6000);
 
   await page.locator(`((//div[contains(@class,"formgrid")])[3]//td)[3]/div`).click();
   await page.waitForTimeout(3000);
   //Verify the Tri state option chosen
   await page.locator(`((//div[contains(@class,"formgrid")])[4]//div//div)[1]`).click();
   await expect(page.locator(`//p[contains(text(), 'State =')]`)).toBeVisible();
   const triState= page.locator(`//div[@class="ui-growl-message"]/span/following-sibling::p`).first();
   const triStateSelection=await triState.textContent();
   console.log(`Selected Tri-State is "${triStateSelection}"`);
   await page.waitForTimeout(6000);


   // const locator=await page.locator(`//div[contains(@class,"ui-growl-message")]/p`);
   // const selectedSate=locator.textContent();
   // console.log(selectedSate);
   await page.locator(`(//div[contains(@class,"toggleswitch")])[1]`).click();
   await page.waitForTimeout(2000);
   // await expect(page.locator(`//div[@class="ui-growl-message"]/span`)).toBeVisible();
   const toggle= page.locator(`//div[@class="ui-growl-message"]/span`);
   await expect(toggle).toBeVisible();
   const toggleSwitch=await toggle.textContent();
   console.log(`Selected ToggleSwitch is "${toggleSwitch}"`);


   //Check the checkbox is disabled
   await expect(page.locator(`(//div[contains(@class,"formgrid")])[5]//input`)).toBeDisabled();
   // const isItDisabled=await page.locator(`(//div[contains(@class,"formgrid")])[5]//div//div//div[contains(@class,"chkbox")]`).isDisabled();
   // console.log(isItDisabled);
   await page.waitForTimeout(2000);
   await page.locator(`(//div[contains(@class,"selectcheckboxmenu")]//ul)[1]`).click();
   await page.locator(`//ul[contains(@class,"selectcheckboxmenu")]//li[label[contains(text(),"London")]]/div`).click();
   await page.locator(`//ul[contains(@class,"selectcheckboxmenu")]//li[label[contains(text(),"Paris")]]/div`).click();
   await page.locator(`//ul[contains(@class,"selectcheckboxmenu")]//li[label[contains(text(),"Amsterdam")]]/div`).click();
   await page.waitForTimeout(2000);
   const multiCheckValue=await page.locator(`//span[contains(@class,"ui-icon-check")]/ancestor::li`);

   const len=await multiCheckValue.count();
   console.log(len)
   await page.waitForTimeout(2000);

   for (let i=0; i<len;i++){
      const value=await multiCheckValue.nth(i).textContent();
      console.log(`Selected from multi dropdown value is : ${value}`)
   }
   await page.waitForTimeout(2000);
});

