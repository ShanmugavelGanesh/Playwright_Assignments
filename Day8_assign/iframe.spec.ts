//Create a code with inspect iframe tag

import {test,expect} from "@playwright/test";

test(`Iframe code assignment`, async ({page})=>{

    await page.goto(`https://leafground.com/frame.xhtml`);
    const frame1= page.frameLocator(`[src="default.xhtml"]`);
    await frame1.locator("#Click").click();
    await expect(frame1.locator("#Click")).toHaveText("Hurray! You Clicked Me.");

    const frames= page.frames();
    const flength=frames.length;
    console.log(`Total no.of frames available in this webpage is ${flength}`)

    const frame2=page.frameLocator('[src="page.xhtml"]');
    const frame3=frame2.frameLocator(`[id="frame2"]`);
    await frame3.locator("#Click").click();
    await page.waitForTimeout(3000);

    
});

