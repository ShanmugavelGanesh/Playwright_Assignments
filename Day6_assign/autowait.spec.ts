// create and check auto waiting features

import{test,expect} from "@playwright/test";
import { TIMEOUT } from "node:dns";

test(`learn autowait and hadling dynamic`,async({page})=>{

    await page.goto(`https://leafground.com/waits.xhtml`);
    await page.locator(`(//span[text()="Click"]/parent::button)[1]`).click();
    await page.locator(`//span[text()="I am here"]/parent::button`).click(),{TIMEOUT:12000};
    await page.locator(`(//span[text()="Click"]/parent::button)[2]`).click(),{TIMEOUT:10000};
    const hideField=await page.locator(`//span[text()="I am about to hide"]/parent::button`);
    await expect(hideField).toBeEnabled();
    await page.locator(`(//span[text()="Click"]/parent::button)[2]`).click(),{TIMEOUT:10000};
    await expect(hideField).toBeHidden({timeout:10000});
    //    await expect(page.locator((//span[text()="Click First Button"]/parent::button`)).toBeEnabled();
    await page.locator('//span[text()="Click First Button"]').click();
     await page.locator(`//span[text()="Click Second"]`).click(),{TIMEOUT:10000};


    await expect(page.locator(`(//span[text()="Click"]/parent::button)[3]/following::button`)).toHaveText('I am going to change!');
    await page.locator(`(//span[text()="Click"]/parent::button)[3]`).click();{Timeout:10000};
    await expect(page.locator(`(//span[text()="Click"]/parent::button)[3]/following::button`)).toHaveText('Did you notice?'),
    await page.waitForTimeout(3000)

});