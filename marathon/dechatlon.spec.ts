import {test,expect} from "@playwright/test";

test('TC_DECHATLON - Order the product', async ({ page }) => {

await page.goto(`https://www.decathlon.in/`);

await page.locator('(//div[contains(@class, "HgISxI")])[1]').click();
await page.keyboard.type('shoes')
await page.keyboard.press('Enter');
await page.waitForTimeout(2000);
await expect(page.locator(`//div[contains(@class,"overflow-scroll")]`)).toBeEnabled();
await page.locator(`(//div[contains(@class,"overflow-scroll")]/div)[2]//ul/li[span[contains(text(),"Men")]]`).click();
await page.waitForTimeout(2000);
await page.locator(`(//div[contains(@class,"overflow-scroll")]/div)[4]//ul/li[span[contains(text(),"Uk 10.5")]]`).click();
await page.waitForTimeout(2000);
await page.locator('(//div[contains(@class,"overflow-scroll")]/div)[5]//ul/li[span[contains(text(),"Running")]]').click();
await page.locator(`//img[contains(@class,"down-arrow")]`).click();
await page.locator(`//span[contains(text(),"Most Relevant")]/parent::p/ul/li[a[contains(text(),"Price: High to Low")]]`).click();
await page.locator('//div[contains(@class, "InfiniteHits")]//li//div[@id="8913926"]').click();
await page.locator('//div[contains(@class,"flex ")]//div[contains(text(),"UK 10.5")]').click();
await page.locator(`//span[text()="ADD TO CART"]/ancestor::button`).click();
const selectedbrandName=await page.locator(`//small[text()="KIPRUN"]`).innerText();
console.log(`Brand Name is : ${selectedbrandName}`)
const selectedbrandModel=await page.locator(`//h1[contains(text(),"Men Running")]`).innerText();
console.log(`Brand Model is : ${selectedbrandModel}`)
await expect(page.locator(`//h3[text()="Product added to cart"]`)).toBeVisible();
await page.locator('//p[text()="Cart"]').click();
await expect(page.locator(`//div[@class="relative"]/parent::div[contains(@class,"relative")]/div[contains(@class,"flex-col")]//span[contains(@data-test-id,"product-brand")]`)).toHaveText(selectedbrandName);
await expect(page.locator(`//div[@class="relative"]/parent::div[contains(@class,"relative")]/div[contains(@class,"flex-col")]//span[contains(@data-test-id,"product-name")]`)).toHaveText(selectedbrandModel);
await page.waitForTimeout(4000);
});