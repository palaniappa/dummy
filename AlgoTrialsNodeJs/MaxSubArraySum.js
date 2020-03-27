'use strict';

const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
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

// Complete the maxSubarray function below.
function maxSubarray(arr) {

    let retSum = [];
    let maxSeqSum = [];
    maxSeqSum[0] = arr[0];
    retSum[0] = arr[0];
    retSum[1] = arr[0];
    for(var idx=1;idx< arr.length;++idx){
        let no = arr[idx];
        let continuousSum = no + maxSeqSum[idx-1];
        maxSeqSum[idx] = Math.max(continuousSum,no);
        if(retSum[0] < maxSeqSum[idx]){
            retSum[0] = maxSeqSum[idx];
        }
        retSum[1] = Math.max(retSum[1], retSum[1] + no, no);
    }

    return retSum;

}

function main() {
    const ws = process.stdout;

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = maxSubarray(arr);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
