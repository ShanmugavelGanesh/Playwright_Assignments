import { test, expect } from "@playwright/test";

let token: any
let inst_url: any
let tokenType: any
let id: any
let username:any

test.use({ storageState: "Data/login_Salesforce.json" })

test.describe.serial(`Salesforce`, async () => {

    test(`Generate Token`, async ({ request }) => {

        const response = await request.post(`https://login.salesforce.com/services/oauth2/token`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "client_id": "3MVG9dAEux2v1sLvd8PBuCGs_vxRlmDczyzbm48kJkyd3WftWice7epzlTzCNJGdaAnSwYa_IwBj8f9sMftGN",
                    "client_secret": "FDB8E2CA7852B964D751CCDFC7E7EAA6D1047A7D0D0A3CCF1CCE98AB8DB936FB",
                    "username": "helloshanmugavel.16ac0b72a5a7@agentforce.com",
                    "password": "Shan@3046WKlUVXsofbdffJzIBZWlhlfc4",
                    "grant_type": "password",
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);
        token = responseBody.access_token
        inst_url = responseBody.instance_url
        tokenType = responseBody.token_type
    })

    test(`Create Lead`, async ({ request }) => {
        const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Lead/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}` // Bearer AccesToken
                },
                data: {
                    "Salutation": "Mr.",
                    "FirstName": "Shan",
                    "LastName": "Marathon3",
                    "Company": "Kumaran"
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);

        id = responseBody.id
    })
    test(`Fetch Lead`, async ({ request }) => {
            const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Lead/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${tokenType} ${token}` // Bearer AccesToken
                    }
                }
            )
            const responseBody = await response.json()
            console.log(responseBody);
            username=responseBody.Name
            console.log(username);
    })

    test(`Delete the selected lead`, async ({ page }) => {

        await page.goto(`https://orgfarm-b8a1f4d319-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome`);
        await page.waitForTimeout(6000);
        await page.getByTitle("App Launcher", { exact: true }).click();
        await page.getByRole("button", { name: "View All Applications" }).click();
        await page.getByPlaceholder("Search apps or items...", { exact: true }).fill("Leads")
        await page.waitForTimeout(3000);
        await page.getByRole("link", { name: "Leads" }).click();
        await page.waitForTimeout(3000);
        // await page.locator(`//span[text()="${username}"]`).click();
        await page.locator(`//span[text()="${username}"]`).click();
        await page.getByRole("button", { name: "Show more actions" }).click();
        await page.getByRole("menuitem", { name: "Delete" }).click();
        await page.getByRole("button", { name: "Delete" }).click();
        // await page.waitForTimeout(5000);
        await expect(page.locator(`.toastMessage`)).toContainText(`Lead "${username}" was deleted. `);
        await page.waitForTimeout(5000);
    })

})