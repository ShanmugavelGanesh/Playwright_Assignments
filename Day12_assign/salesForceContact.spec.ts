//POSTMAN API Testing in SalesForce for Case creation/Retreive/Update and Delete

import { test, expect } from "@playwright/test";


let token: any
let inst_url: any
let tokenType: any
let id: any
let accid: any

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

    test(`Create Account`, async ({ request }) => {
        const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Account/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}`
                },
                data: {
                    "Name": "Credits"
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);

        accid = responseBody.id
    })


    test(`Create Contact`, async ({ request }) => {
        const response = await request.post(`${inst_url}/services/data/v65.0/sobjects/Contact/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}`
                },
                data: {
                    "Salutation": "Mr.",
                    "FirstName": "Shanmugavel",
                    "LastName": "G",
                    "Email": "shanvel3046@gmail.com",
                    "AccountId": accid
                }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody);

        id = responseBody.id
    })
    test(`Fetch Contact`, async ({ request }) => {
        const response = await request.get(`${inst_url}/services/data/v65.0/sobjects/Contact/${id}`,
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

    test(`Update the Contact`, async ({ request }) => {
        // await page.goto()
        const response = await request.patch(`${inst_url}/services/data/v65.0/sobjects/Contact/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${tokenType} ${token}`
                },
                data: {
                    "Phone": "8945124512",
                    "Email": "test@test.com",
                    "Title": "Shan_new_contact added",
                    "Department": "QA_Banking"
                }
            }
        )

        console.log(response.status());
        expect(response.status()).toBe(204)

    })

    test(`Delete Contact`, async ({ request }) => {
        const response = await request.delete(`${inst_url}/services/data/v65.0/sobjects/Contact/${id}`,
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
