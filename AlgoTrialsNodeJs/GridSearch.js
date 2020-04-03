'use strict';

const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('GridSearchTC5_1.txt');

const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

rl.resume();

let inputString = '';
let currentLine = 0;

rl.on('line', inputStdin => {
    inputString += inputStdin + "\n";
});

rl.on('close', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the gridSearch function below.
function gridSearch(G, P) {
    
    var patternIndex = 0;
    var expectedIdx =-1;
    var startIdx = 0;
    var prevI = 0;
    let i = 0;

    while(i<G.length && patternIndex < P.length){
        var indexOf = G[i].indexOf(P[patternIndex], startIdx);
        if(indexOf > -1){
            if(expectedIdx == -1){
                expectedIdx = indexOf;
                prevI = i;
                patternIndex++;
                i++;
            }
            else if(expectedIdx != indexOf){
                patternIndex = 0;
                i = prevI;
                startIdx = expectedIdx+1;
                expectedIdx = -1;
            }
            else{
                patternIndex++;
                i++;
            }
        }
        else{
            if(expectedIdx == -1 || startIdx > P[0].length){
                i++;
                startIdx = 0;
            }
            else{
                i = prevI;
                startIdx = expectedIdx+1;
            }
            patternIndex = 0;
            expectedIdx = -1;
        }
    }

    if(patternIndex == P.length){
        return "YES";
    }
    return "NO";

}

function main() {
     const ws = process.stdout;

     const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');

        const R = parseInt(RC[0], 10);

        const C = parseInt(RC[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const rc = readLine().split(' ');

        const r = parseInt(rc[0], 10);

        const c = parseInt(rc[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        // let G = [];
        // G[0] = "7283455864";
        // G[1] = "6731158619";
        // G[2] = "8988242643";
        // G[3] = "3830589324";
        // G[4] = "2229505813";
        // G[5] = "5633845374";
        // G[6] = "6473530293";
        // G[7] = "7053106601";
        // G[8] = "0834282956";
        // G[9] = "4607924137";

        // let P = [];
        // P.push("9505");
        // P.push("3845");
        // P.push("3530");
        let result = gridSearch(G, P);

        ws.write(result + "\n");
    }

    ws.end();
}

//main();