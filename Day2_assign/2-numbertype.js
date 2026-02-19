//Print the given number is Postive or Negative or Neutral

// function parameter(){
//     let num;
//     for (num=3;num>=-3;num--){
//     if(num>0){
//         console.log(num +' is Positive');
//     } else if(num==0){
//         console.log(num +' is Neutral');
        
//     }else{
//         console.log(num +' is Negative');
        
//     }
 
// }
// }

// parameter()

function parameter1(){
    let num;
    for (num=3;num>=-3;num--){
    switch (num){
    case num>0:
        console.log(num +' is Positive');
        break;
    case num==0:
        console.log(num +' is Neutral');
        break;
    default:
        console.log(num +' is Negative');        
    }
}
}

parameter1()