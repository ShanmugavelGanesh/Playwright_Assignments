// Create a code in typescipt usnig enum and function


enum Environment{
    LOCAL="LOCAL",
    DEVELOPMENT = 'DEVELOPMENT',
    STAGING = 'STAGING',
    PRODUCTION = 'PRODUCTION',
    Error =2
}

function runTests(stage : Environment) {
        console.log(`Environment currently pointed to :  ${stage}`)
        return stage
}
const currenv=runTests(Environment.DEVELOPMENT)
console.log(currenv)
runTests(Environment.LOCAL)


function voidTest(stage : Environment) : void{
    if(stage==Environment.Error){
        console.log("Environment not deteccted");
    }else{
        console.log(`Environment currently pointed to :  ${stage}`)
    }
    // return stage - in void function we could not return any value - void generally does not return any value
}
voidTest(Environment.DEVELOPMENT)
voidTest(Environment.LOCAL)
voidTest(Environment.Error)

