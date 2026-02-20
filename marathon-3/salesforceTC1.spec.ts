import { test,expect } from "@playwright/test";

let token: any
let inst_url: any
let tokenType: any
let id: any

test.use({storageState:"Data/login_Salesforce.json"})

test.describe.serial(`Salesforce`, async () => {

    test(`Create Lead`, async ({ page }) => {
        await page.goto(`https://orgfarm-b8a1f4d319-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome`);
        await page.waitForTimeout(3000);
        // await page.waitForLoadState("domcontentloaded");
        await page.getByTitle("App Launcher",{exact:true}).click();
        await page.getByRole("button",{name:"View All Applications"}).click();
        await page.getByPlaceholder("Search apps or items...",{exact:true}).fill("Dashboards")
        await page.waitForTimeout(3000);
        await page.getByRole("link",{name:"Dashboards"}).click();
        await page.waitForTimeout(3000);
        await page.getByRole("button",{name:"New Dashboard"}).click();
        await page.frameLocator(`iframe[title='dashboard']`).getByRole("textbox",{name:"Name"}).fill('Sample');
        await page.frameLocator(`iframe[title='dashboard']`).getByRole("button",{name:"Create"}).click();
        await page.frameLocator(`iframe[title='dashboard']`).locator('.slds-form-element').click();
        await page.keyboard.press("Delete");
        await page.keyboard.type("Salesforce Automation by Shanmugavel")
        await page.frameLocator(`iframe[title='dashboard']`).getByRole("button",{name:"Save"}).click();
        await expect(page.locator(`.toastMessage`)).toContainText("Dashboard saved");
        await page.waitForTimeout(5000);
    })

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

    test(`Get all the Dashboard and delete the selected Dashboard`, async ({ request }) => {
            // await page.goto()
            const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Dashboard`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${tokenType} ${token}` 
                    }
                }
            )
        const data = await response.json();
        const dashboard=data.recentItems;
        console.log(dashboard)
        console.log(dashboard[0].Id)
        if(dashboard.length>0){
            for(let i=0;i<dashboard.length;i++){
                if(dashboard[i].Title=="Salesforce Automation by Shanmugavel"){
                    id=dashboard[i].Id;
                    const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Dashboard/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${tokenType} ${token}` 
                            }
                        }
                    )
                    console.log(response.status());
                    expect(response.status()).toBe(204)
            
                    console.log(response.statusText());
                    expect(response.statusText()).toBe("No Content")
                }else{
                    console.log("Dashboard is not available on given name");
                }
            }
        }else{
            console.log("No Dashboard is present to delete");
        }
        })
    

    

})