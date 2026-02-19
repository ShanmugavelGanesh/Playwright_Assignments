import { test } from "@playwright/test";
import path from "path";

test(`Learn to automate File Download`, async ({ page }) => {

    await page.goto(`https://leafground.com/file.xhtml`);

    const filePromise = page.waitForEvent("download") // having the listener before thw click action

    await page.getByText(`Download`, { exact: true }).click();

    const fDown = await filePromise

    //Option 1 - Relative path
    //   await fDown.saveAs(`Data/JanPW.png`) // Relative path this is not advisable

    //Option2 - Absolute path
    //   await fDown.saveAs(path.join(__dirname,`../../Data/AbsolutePath.png`))

    // console.log(__dirname); 
    // what "__dirname" means : D:\Playwright_Folder\playwright_training\PW-JS-JAN-26\tests\Day10


      // Create timestamp: 2026-02-08_10-45-30
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



})