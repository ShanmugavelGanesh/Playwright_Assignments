// Create a code array intersection
function intersectionnumber(){
    arr1=[1,2,3,4,5];
    arr2=[4,5,6,7,8];
    commonarr=[];
    for(let i=0;i<arr1.length;i++){
        // console.log(arr1[i]);
        for(let k=0;k<arr2.length;k++){
            // console.log(arr2[k]);
            while (arr2[k]==arr1[i]){
                commonarr.push(arr2[k]);
                break;
            }          
        }
    } console.log(`Common value number Array Value : ${commonarr}`)
}
intersectionnumber();
    Strarr1=["Test", "the", "Code", "with", "Javascript"];
    Strarr2=["Test", "the", "Code", "with", "Typescript"];
    commonStrArr=[];
function intersectionString(){
      for(let i=0;i<Strarr1.length;i++){
        // console.log(arr1[i]);
        for(let k=0;k<Strarr2.length;k++){
            // console.log(arr2[k]);
            while (Strarr2[k]==Strarr1[i]){
                commonStrArr.push(Strarr2[k]);
                break;
            }          
        }
    } console.log(`Common value String Array Value : ${commonStrArr}`)
}intersectionString();


