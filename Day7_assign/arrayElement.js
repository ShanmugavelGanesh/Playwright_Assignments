//Create a code for array

    const num =[2,4,5,2,1,2];
    const arrayLength=num.length;
    let count=0;
    function arrayCount(k){
    for(let i=0;i<arrayLength;i++){
        console.log(num[i]);
        if(k==num[i])
            count=count+1;
    }
     console.log(`the count of 2 present in array is : ${count}`)
    }
    arrayCount(2);
   