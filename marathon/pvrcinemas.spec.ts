import { test, expect } from '@playwright/test';

test('TC_PVR - Book Movie Ticket in PVR Cinemas', async ({ page }) => {
    
    //Launch the browser and open URL 
    await page.goto('https://www.pvrcinemas.com/');

    //Select the city as "Chennai" [cite: 7]
    await page.locator(`//input[@role="combobox"]`).click();
    await page.locator(`//input[@role="combobox"]`).fill('Chennai');
    await page.locator("//ul/li//span[text()='Chennai']").click();
    await page.locator(`(//span[contains(text(),"Cinema")])[1]`).click();
    await page.waitForTimeout(3000);

    //Choose cinema location from the list 
    if(await page.locator(`//ul[@role="listbox"]/li`).isVisible()){
        await page.locator(`//ul[@role="listbox"]/li`).nth(0).click();
    }else{
        await page.locator(`(//span[contains(text(),"Select Cinema")])[1]`).click();
        await page.locator(`//ul[@role="listbox"]/li`).nth(0).click();
    }
    await page.waitForTimeout(2000);
    //Select Date
    if(await page.locator(`//ul[contains(@class,"p-dropdown-items")]`).isVisible()){
        await page.locator(`//ul[@role="listbox"]/li`).nth(2).click();
    }else{
        await page.locator(`(//span[contains(text(),"Select Date")])[1]`).click();
        await page.locator(`//ul[@role="listbox"]/li`).nth(2).click();
    }
    await page.waitForTimeout(2000)
    //Select Movie
    if(await page.locator(`//ul[contains(@class,"p-dropdown-items")]`).isVisible()) {
        await page.locator(`//ul[@role="listbox"]/li`).nth(0).click();
    }else{
        await page.locator(`(//span[contains(text(),"Select Movie")])[1]`).click();
        await page.locator(`//ul[@role="listbox"]/li`).nth(0).click();
    }
    await page.waitForTimeout(2000);
    //Select Time
    if(await page.locator(`//ul[contains(@class,"p-dropdown-items")]`).isVisible()) {  
        await page.locator(`//ul[@role="listbox"]/li`).nth(3).click();
    }else{
        await page.locator(`(//span[contains(text(),"Select Timing")])[1]`).click();
        await page.locator(`//ul[@role="listbox"]/li`).nth(3).click();
    }

    // 7. Click on Book button [cite: 12]
    await page.locator(`//button[@type="submit"]`).click();
    await page.waitForTimeout(2000);

    // 8. Click on Accept for Terms & Conditions [cite: 13]
    const acceptBtn = page.locator("//button[text()='Accept']");
    if(await acceptBtn.isVisible()) {
        await acceptBtn.click();
    }
    await page.waitForTimeout(2000);

    // 9. Select the available seat [cite: 14]
    // Selecting the first seat that is not already booked
    await page.locator(`((//div[@class="all-seats"]/div/tr)[10]/td)[10]`).click()
    await page.locator(`((//div[@class="all-seats"]/div/tr)[10]/td)[11]`).click()
    await page.waitForTimeout(2000);

    // // 10. Verify seat information and total ticket amount [cite: 15]
    const seatInfo = await page.locator(`//h6[contains(text(),"Seat Info")]`).isEnabled();
    if(seatInfo==true) {
        console.log("Seat selection successful");
        // const row = await page.locator(`((//span[@class="seat-selected-pvr"])[1]/ancestor::tr//span[@class="seat-row-no area"])[1]`)
        // const rowtext= await rowlocator.textContent();
        // console.log(`Row details: ${rowtext}`);
        const selectedSeats = page.locator('//span[contains(@class,"seat-selected")]');
        const ticketCount = await selectedSeats.count();
        console.log(`Selected tickets: ${ticketCount}`);
        const seatNumber = page.locator(`//div[@class="seat-number"]`);
        let finalTicket='';
        for(let i=0; i<ticketCount; i++) {
            console.log(`Seat Number: ${await seatNumber.nth(i).textContent()}`);
            finalTicket = finalTicket + await seatNumber.nth(i).textContent();
        }
        // console.log(finalTicket);

        ////div[@class="select-seat-number"]//p
        const seatfinalNumber = page.locator(`//div[@class="select-seat-number"]//p`);
        const finalcount = await seatfinalNumber.count();
        let finalSeat='';
        for(let i=0; i<finalcount; i++) {
            finalSeat = finalSeat + await seatfinalNumber.nth(i).textContent();
        }
        console.log(`Final Seat Number: ${finalSeat}`);

        if(finalTicket===finalSeat) {
            console.log("Seat numbers match");
            const row = await page.locator(`((//span[@class="seat-selected-pvr"])[1]/ancestor::tr//span[@class="seat-row-no area"])[1]`)
            const rowtext= await row.textContent();
            let value='ABCDEFGHIJKL'
            if(value.includes(rowtext!.trim())) {
                let type=await page.locator(`(//span[@class="seats_area_type"])[2]`)
                
                let value=await type.textContent();
                console.log(`Seat Type and Price: ${value}`);
                // console.log(value);
                if(value!=null) {
                let val1=value.split('(');
                // console.log(val1)
                let val2=val1[1].split(`+`);
                let amount=val2[0];
                let amountavlue=parseFloat(amount)
                console.log(`Ticket Amount: ${amountavlue}`);
                let twoTicket =amountavlue * ticketCount;
                console.log(`Total Amount for ${ticketCount} ticket is: Rs.${twoTicket}`);
                // let GSTcal=await page.locator(`(//div[@class="tickets-count"])[2]/following-sibling::div/p`);
                let GSTcal=await page.locator(`//p[text()="56.08"]`);
                let GST=await GSTcal.innerText()
                let GST1=parseFloat(GST);
                // console.log(`Print GST 1 value : ${GST1}`)    
                console.log(`GST Amount: ${GST}`);
                let TotalAmount= twoTicket + GST1;
                let TotalAmount1=parseFloat(TotalAmount.toFixed(2));
                console.log(`Grand Total Amount: Rs.${TotalAmount1}`);
                await page.waitForTimeout(2000);
                await page.locator(`//i[contains(@class,"pi")]`).click();
                let convFee=await page.locator(`//h6[text()="Conv fee"]/parent::div/following-sibling::div/p`).innerText();
                let convFee1=parseFloat(convFee);
                console.log(`Convenience Fee: ${convFee}`);
                let convFeeGST=await page.locator(`//h6[text()="Conv fee"]/parent::div/parent::div/following-sibling::div//h6[text()="GST"]/parent::div/following-sibling::div/p`).innerText();
                let convFeeGST1=parseFloat(convFeeGST);
                console.log(`Convenience Fee GST: ${convFeeGST}`);
                let calculatedGrandTotal= TotalAmount1 + convFee1 + convFeeGST1;
                // let roundVal=grandTotal;
                console.log(`Final Grand Total Amount: Rs.${calculatedGrandTotal}`);
                const grandTotal=await page.locator(`//h6[text()="Grand Total"]/parent::div/following-sibling::div/h6`).innerText();
                if (parseFloat(grandTotal)==calculatedGrandTotal){
                    await page.locator(`//button[text()="Proceed"]`).click();
                }else {
                    console.log(`Ticker price does not match`)
                }
                await page.waitForTimeout(4000); 
            }
    } else {
        console.log("Seat number not matching");
    }
}
}
});