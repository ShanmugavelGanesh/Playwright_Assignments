//POSTMAN API Testing in salesforce Get all the Oppurtunities and delete the first record


import { test, expect } from "@playwright/test";


let token: any
let inst_url: any
let tokenType: any
let id: any

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
        token = responseBody.access_token // access token
        inst_url = responseBody.instance_url
        tokenType = responseBody.token_type // Bearer
    })
   
    test(`Get all the opportunities and delete the first record`, async ({ request }) => {
        // await page.goto()
        const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Opportunity`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}` // Bearer AccesToken
                }
            }
        )
        const data = await response.json();
        const oppurtunities=data.recentItems;
        console.log(oppurtunities)
        console.log(oppurtunities[0].Id)
        if(oppurtunities.length>0){
            id=oppurtunities[0].Id;
            const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Opportunity/${id}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${tokenType} ${token}` // Bearer AccesToken
                            }
                        }
                    )
                    console.log(response.status());
                    expect(response.status()).toBe(204)
            
                    console.log(response.statusText());
                    expect(response.statusText()).toBe("No Content")
        }else{
            console.log('No oppurtunited exist')
        }

    })


})

/* Note :
When we create a incident or Lead we will have "data" in post()
When we need generate the access token we need to have "form" */