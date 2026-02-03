//create a reverse a string 
let rev1='';
let reverse='';
let char='';
function rev(str){
   let length=str.length;
   let a=str.split(' ')
   for (let i=0; i<a.length; i++){
      reverse='';
    for(let j=a[i].length-1; j>=0; j--){
        char=a[i][j]
        reverse=reverse+char
    }
    // rev1=reverse+rev1; 
    a[i]=reverse;
}console.log(a)
}
rev(`I am a developer`)