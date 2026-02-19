//Create a script for upload and download:

import{test,expect} from "@playwright/test";
import path from "path";

test(`Script for upload`,async ({page})=>{

//upload
await page.goto(`https://the-internet.herokuapp.com/upload`);
const fileInput=await page.locator('(//input[@type="file"])[2]');
await fileInput.setInputFiles([path.join(__dirname,'../../order-confirmation.png')])
await page.getByRole('button',{name:'Upload'}).click();
await page.waitForTimeout(3000);
// await expect(page.getByText('File Uploaded!')).toBeVisible();
await page.waitForTimeout(3000);

//download
await page.goto(`https://the-internet.herokuapp.com/download`);

})

test(`Script for download`,async ({page})=>{

//download
await page.goto(`https://the-internet.herokuapp.com/download`);
const filePromise = page.waitForEvent("download")
await page.getByRole(`link`, { name:'order-confirmation.png' }).click();
const fDown = await filePromise
const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");
    const filePath = path.join(
        __dirname,
        `../../Data/Download_${timestamp}.png`
    );
     await fDown.saveAs(filePath);
    //await fDown.saveAs("D:\\JanPWDownload.png")
    await page.waitForTimeout(3000)
});