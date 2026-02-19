//Access files data from .env, .josn and .csv files

import { test,expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import {parse} from "csv-parse/sync"
import fs from "fs"

dotenv.config({path:`Data/prod.env`}) 
let userData : any[] = parse(fs.readFileSync("Data/leaddata.csv"),{columns:true,skip_empty_lines:true})

for (let data of userData){
test(`Data parameterization`, async ({page})=>{

    await page.goto(process.env.BaseUrl!);
    await page.locator(`#username`).fill(process.env.LF_Username!);
    await page.locator(`#password`).fill(process.env.LF_Password!);
    await page.locator(`.decorativeSubmit`).click() 
    await page.getByRole('link',{name: 'CRM/SFA'}).click();

    await page.locator(`(//div[@class='frameSectionHeader']/following::a)[1]`).click()
    await page.locator(`(//ul[@class='shortcuts']//a)[2]`).click()
    await page.locator(`#createLeadForm_companyName`).fill(data.companyName);
    await page.locator(`#createLeadForm_firstName`).fill(data.firstName);
    await page.locator(`#createLeadForm_lastName`).fill(data.lastName);
    await page.locator('#createLeadForm_dataSourceId').selectOption(data.sourceId);
    await page.locator('#createLeadForm_marketingCampaignId').selectOption(data.marketingCampaign);

    const marketingCampaigndd = page.locator(`#createLeadForm_marketingCampaignId option`);

    let len= await marketingCampaigndd.count();

    for(let i=0;i<len;i++){
        console.log(`Value from marketingCampaign dropdiown is ` + await marketingCampaigndd.nth(i).innerText())
    }

    let indexvalue=parseInt(data.indexSelect);
    await page.locator('#createLeadForm_industryEnumId').selectOption({index:indexvalue});
    await page.locator('#createLeadForm_currencyUomId').selectOption(data.currency);
    await page.locator('#createLeadForm_generalCountryGeoId').selectOption(data.country);
    await page.locator('#createLeadForm_generalStateProvinceGeoId').selectOption(data.state);
    const stateDD = page.locator(`#createLeadForm_marketingCampaignId option`);

    let stateLength= await marketingCampaigndd.count();

    for(let i=0;i<stateLength;i++){
        console.log(`Value from State dropdiown is ` + await stateDD.nth(i).innerText())
    }
    await page.locator(`#createLeadForm_personalTitle`).fill(data.personalTitle);
    await page.locator(`#createLeadForm_generalProfTitle`).fill(data.generalProfTitle);
    await page.locator(`#createLeadForm_annualRevenue`).fill(data.annualRevenue);
    await page.locator(`#createLeadForm_departmentName`).fill(data.departmentName);
    await page.locator(`#createLeadForm_primaryPhoneNumber`).fill(data.primaryPhoneNumber);
    await page.locator(`.smallSubmit`).click()
    await page.waitForTimeout(4000);
})
}