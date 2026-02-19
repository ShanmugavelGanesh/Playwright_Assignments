
import { test,expect } from "@playwright/test";
import {parse} from "csv-parse/sync"
import fs from "fs"
import path from "path";

let userData : any[] = parse(fs.readFileSync("Data/leaddata.csv"),{columns:true,skip_empty_lines:true})

test.use({storageState:"Data/login_Salesforce.json"})

test(`Data parameterization`, async ({page})=>{

    await page.goto(`https://orgfarm-b8a1f4d319-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome`)
    console.log(await page.title());
    await page.getByTitle("App Launcher",{exact:true}).click();
    await page.getByRole(`button`,{name:'View All Applications'}).click();
    await page.getByRole('button',{name:'Cancel and close'}).click();
    await page.getByTitle("App Launcher",{exact:true}).click();
    await page.getByRole(`button`,{name:'View All Applications'}).click()
    await page.getByRole('combobox',{name:'Search apps or items...'}).fill('Accounts')
    await page.locator(`//mark[text()="Accounts"]`).click();
    await page.waitForTimeout(2000)
    await page.getByRole('button',{name:'New'}).click();
    const name='Fourth_Account';
    await page.getByRole('textbox',{name:'Account Name'}).fill(name)
    await page.getByRole('combobox',{name:'Rating'}).click();
    await page.getByRole('option',{name:'Warm'}).click();
    await page.getByRole('combobox',{name:'Industry'}).click();
    await page.getByRole('option',{name:'Banking'}).click();
    await page.getByRole('combobox',{name:'Ownership'}).click();
    await page.getByRole('option',{name:'Public'}).click();
    await page.getByRole('button',{name:'Save',exact:true}).click();
    const toast = page.locator('.toastMessage');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(`Account "${name}" was created.`);
    await page.waitForTimeout(2000);
    const fileInput=await page.locator('.slds-file-selector__button');
    await fileInput.setInputFiles([path.join(__dirname,'../../order-confirmation.png')])
    await page.getByRole(`button`,{name:'Done'}).click()
    await page.locator(`.forceRecordLayout`)
    if(await page.locator(`.forceRecordLayout`).isVisible()){
        await expect(page.locator('.toastMessage')).toContainText('1 file was added to the Account.');
    } await expect(page.locator('.toastMessage')).toContainText('1 file was uploaded.');
    
    await page.waitForTimeout(3000)
});
