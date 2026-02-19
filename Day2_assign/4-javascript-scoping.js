//Write a porgram using Javascript scoping (var vs let vs const)

var letGender='Female';

function printGender(){
    console.log('Current Gender value is :'+letGender);
    
    let color='brown';
    if(letGender.startsWith('Female')){
        var age=30;
        let color='pink';
        console.log('inside if block color is : '+color);
    }
    console.log('Outside if block age is :'+age);
    console.log('Outside if block color is :'+color);
    
}
printGender();

 letGender='male';

function printGender1(){
    console.log('Current Gender value is :'+letGender);
    let color='brown';
    if(letGender.startsWith('Female')){
        var age=30;
        let color='pink';
        console.log('inside if block color is : '+color);
    }
    console.log('Outside if block age is :'+age);
    console.log('Outside if block color is :'+color);
    
}
printGender1()