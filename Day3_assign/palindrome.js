// Write a code to find the palindrome of a string
var char
let reverse='';
function isPalindrome(str) {
    let length=str.length;
    console.log(length)
    for (let i = length-1; i > -1; i--) {
         char=str[i];
         reverse=reverse+char
         
    }  
    
    console.log(`${str} is a given string value`)
    console.log(`${reverse} is reverse string value`)

    if(str===reverse){
        console.log(`${str} is a Palindrome`)
    }else {
        console.log(`${str} is not a Palindrome`)
    }
  
}
isPalindrome('noon')  

