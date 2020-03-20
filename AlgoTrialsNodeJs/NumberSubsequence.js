'use strict';
main();

function main(){
    let piNumber = "3141592653589793238462643383279";//502884197169399375105820974944592307816406286";
    let preferredNumbers = ["314", "49", "9001", "15926535897", "14", "9323", "8462643383279", "4", "793"];

    for(var i=0;i<preferredNumbers.length-1;++i){
        for(var j=i+1;j<preferredNumbers.length;++j){
            if(preferredNumbers[j].length > preferredNumbers[i].length){
                let t = preferredNumbers[i];
                preferredNumbers[i] = preferredNumbers[j];
                preferredNumbers[j] = t;
            }
        }
    }

    let usedStrings = [];
    let count = getSpaceCount(piNumber, preferredNumbers, usedStrings);
    process.stdout.write("We need " + count + " with " + JSON.stringify(usedStrings) + " strings " + JSON.stringify(preferredNumbers));
}

function getSpaceCount(remainingPiNumber, preferredNumbers, usedStrings) {
    if (remainingPiNumber.trim().length == 0)
        return 0;

    for (var i = 0; i < preferredNumbers.length; ++i) {
        let currentRemainingPiNumber = remainingPiNumber;
        if (remainingPiNumber.indexOf(preferredNumbers[i]) != -1 && !usedStrings[i]) {
            usedStrings[i] = true;
            currentRemainingPiNumber = currentRemainingPiNumber.replace(preferredNumbers[i]," ")
            var remainingCount =  getSpaceCount(currentRemainingPiNumber, preferredNumbers, usedStrings);
            if(remainingCount != -1)
                return 1 + remainingCount;
            usedStrings[i] = false;
        }
    }
}

