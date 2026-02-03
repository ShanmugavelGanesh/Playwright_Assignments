//Create a code to different way to declare functions in javascript

//Function Declaration
function userProfile(name){
    console.log(`Hello ${name}`)
}
userProfile('Shan');

//ARROW Function
let double = (num)=>  num * 2;
console.log(double(5));

//Anonymous function inside setTimeout
setTimeout(function(){
     console.log('This is an anonymous function inside setTimeout');
}, 2000);


//Callback function
function getUserData(callback){
    setTimeout(()=>{
        callback();
    }, 3000);
}

getUserData(function(){
    console.log('This is a callback function executed after 3 seconds');
})

