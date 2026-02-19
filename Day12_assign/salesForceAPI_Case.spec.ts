//POSTMAN API Testing in SalesForce for Case creation/Retreive/Update and Delete

import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

let filename= process.env.envfile || "salesForceAPI" 

let token: any
let inst_url: any
let tokenType: any
let id: any
dotenv.config({path:`Data/${filename}.env`})
test.describe.serial(`Salesforce`, async () => {

    test(`Generate Token`, async ({ request }) => {

        const response = await request.post(`https://login.salesforce.com/services/oauth2/token`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    "client_id": process.env.SF_CLIENT_ID!,
                    "client_secret": process.env.SF_CLIENT_SECRET!,
                    "username": process.env.SF_USERNAME!,
                    "password": process.env.SF_PASSWORD!,
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
    test(`Create Case`, async ({ request }) => {
        const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Case/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}` 
                },
                data: {
                    "status": "Escalated",
                    "Origin": "Email"
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);

        id = responseBody.id
    })
    test(`Fetch Case`, async ({ request }) => {
        const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Case/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}` 
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);
    })

    test(`Update the Case`, async ({ request }) => {
        // await page.goto()
        const response = await request.patch(`${inst_url}/services/data/v65.0/sobjects/Case/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}` 
                },
                data: {
                    "status": "Working",
                    "Origin": "Phone",
                    "Priority": "Low",
                    "SLAViolation__c": "No"
                }
            }
        )

        console.log(response.status());
        expect(response.status()).toBe(204)

    })

    test(`Delete Case`, async ({ request }) => {
        const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Case/${id}`,
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
    })
})
