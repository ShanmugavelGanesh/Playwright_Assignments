//create a code using string 

//Split and find the last word and its length
function lastwordinArray(str){
    let a=str.split(' ');
     for (let i=0; i<a.length; i++){
        if(i==a.length-1){
            console.log(`"${str}" - The last word in the string "${str}" is "${a[i]}"`);
            console.log(`"${str}" - The last word of length in the string "${str}" is "${a[i].length}"`);
        }  
}
}
lastwordinArray("I am a Tester")
lastwordinArray("Hello World")
lastwordinArray("fly me to the moon")

//Trim , split, indentify the last word and its length
function trimLastWord(str){
    let trimmedStr = str.trim();
    let a=trimmedStr.split(' ');
    let lastWord = a[a.length - 1];
    console.log(`"${str}" - After trimming, the last word is "${lastWord}" and its length is ${lastWord.length}`);
}
trimLastWord("   Hello World   ")
trimLastWord("   fly me to the moon   ")
trimLastWord("   I am a Tester   ")

//Remove space and convert all letter to same case, sort the characters and compare sorted strings and return the result
function checkstr(str1, str2) {
    let formatStr1 = str1.toLowerCase();
    let formatStr2 = str2.toLowerCase();
    let a1 = formatStr1.split('').sort().join('');
    let a2 = formatStr2.split('').sort().join('');
    if (a1 === a2) {
        console.log(`"${str1}" and "${str2}" are matched.`);
    } else {
        console.log(`"${str1}" and "${str2}" are not matched.`);
    }
}
checkstr("Listen", "Silent");
checkstr("Hello", "World");
