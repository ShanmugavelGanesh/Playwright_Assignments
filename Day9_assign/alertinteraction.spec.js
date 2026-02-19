//Alert Interaction

import {test} from "@playwright/test";

test('alert', async ({page})=> {

await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");

 page.once("dialog",async(alert)=>{

    const altertype=await alert.type();
    console.log(`Alter type is : ${altertype}`)
    await alert.accept();

 })   

const frame1=await page.frameLocator('[id="iframeResult"]');

frame1.getByRole('button',{name:'Try it'}).click({force:true});
await page.waitForTimeout(3000);

const useroption=await frame1.locator(`#demo`).innerText();
console.log(`User choose the option : ${useroption}`)

});
