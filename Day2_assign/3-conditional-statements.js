//Write a program using conditional statements



function launchBrowser(browserName){
    if(browserName=='chrome'){
        console.log('Browser Name is :'+ browserName);       
    }else {
        console.log('This is not a chrome browser');
        
    }

}
launchBrowser('chrome')

function runTests(testType){
    switch (testType){
        case testType=='smoke':
            console.log('Smoke testing');
            break;
        case testType=='sanity':
            console.log('Sanity testing');
            break;
        case testType=='regression':
            console.log('Regression testing');
            break;
        default:
            console.log('Smoke testing');                                        
    }

}
runTests('sanity')