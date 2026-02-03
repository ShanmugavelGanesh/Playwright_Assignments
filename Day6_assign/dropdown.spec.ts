// verify the functionality and selections within select dropdown components on web application using assertions

import{test} from "@playwright/test";
import { TIMEOUT } from "node:dns";

test(`learn mutiple selector in dropdown and assertion1`,async ({page})=>{

await page.goto('https://leafground.com/select.xhtml');
const favorite=await page.locator(`//select[contains(@class,"selectonemenu")]/option`)
await page.waitForTimeout(2000);
await page.selectOption('//select[contains(@class,"selectonemenu")]',{index:1})
await page.waitForTimeout(2000);
await page.selectOption('//select[contains(@class,"selectonemenu")]',{value:"Playwright"})
await page.waitForTimeout(2000);
const favoriteLength= await favorite.count();
console.log(favoriteLength);
let favoriteddValue=[];
for(let i=0;i<favoriteLength;i++){
    favoriteddValue.push(await favorite.nth(i).textContent());
}
console.log(favoriteddValue)
await page.waitForTimeout(2000);
await page.locator('//label[contains(text(),"Select Country")]').click();
await page.locator(`//li[contains(text(),"India")]`).click();
await page.locator('//label[contains(text(),"Select City")]').click();
const cityLocator=await page.locator(`(//div[contains(@class,"selectonemenu")]/ul)[2]/li`);
const cityLength=await cityLocator.count();
console.log(cityLength)
let cityValue=[];
for(let i=0;i<cityLength;i++){
    
    cityValue.push(await cityLocator.nth(i).textContent());
}console.log(`City value list : ${cityValue}`)

for (let j=1;j<cityValue.length;j++){

    if(cityValue[j]==="Chennai" || cityValue[j]=="Bengaluru" || cityValue[j]=="Delhi"){
        console.log(`City value loaded based on the selected Country`)
        break;
    }else{
        console.log(`City not loaded based on the country`)
        break;
    }

}

await page.locator(`//button[contains(@class,"dropdown")]`).click();
await page.locator(`//li[contains(text(),"Playwright")]`).click();
await page.waitForTimeout(2000);
await page.locator(`//input[contains(@id,"auto-complete_input")]`).fill('jmeter');
await page.waitForTimeout(3000);
await page.locator(`//input[contains(@id,"auto-complete_input")]`).press('Enter');
// await page.locator(`//span[contains(@id,"idt87")]//li[@data-item-value="JMeter"]`).click();
await page.locator(`//input[contains(@id,"auto-complete_input")]`).fill('postman');

await page.waitForTimeout(2000);
await page.locator(`//input[contains(@id,"auto-complete_input")]`).press('Enter');
// await page.locator(`//span[contains(@id,"idt87")]//li[@data-item-value="PostMan"]`).click();


await page.locator(`//label[contains(text(),"Select Language")]`).click();
await page.locator('//li[contains(text(),"English")]').click();

const langLocator=await page.locator(`//ul[contains(@id,"lang_items")]/li`);
const langLocatorLength=await langLocator.count();
let langValue=[];
for (let j=0;j<langLocatorLength;j++){
langValue.push(await langLocator.nth(j).textContent())
} console.log(langValue)

await page.locator(`(//div[contains(@class,"selectonemenu")])[7]`).click();
await page.locator(`//ul[contains(@id,"value_items")]/li[contains(text(),"Three")]`).click();
await page.waitForTimeout(3000);
});
