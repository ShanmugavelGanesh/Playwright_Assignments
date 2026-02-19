// String using loop statements

//find the length of last string
function lengthOflastString(str) {
    let length=str.length;
   let a=str.split(' ')
   for (let i=0; i<a.length; i++){
        if(i==a.length-1){
            console.log(`"${str}" - the length of last string "${a[i]}" length is ${a[i].length}`);
        }
   }
}
lengthOflastString("I am a Tester")
lengthOflastString("Hello World")
lengthOflastString("fly me to the moon")

// find the given two string is anagram or not
function areAnagrams(str1, str2) {
    let a1 = str1.split('').sort().join('');
    let a2 = str2.split('').sort().join('');
    if (a1 === a2) {
        console.log(`"${str1}" and "${str2}" are anagrams.`);
    } else {
        console.log(`"${str1}" and "${str2}" are not anagrams.`);
    }   
}
areAnagrams("listen", "silent");
areAnagrams("hello", "world");
areAnagrams("triangle", "integral");

