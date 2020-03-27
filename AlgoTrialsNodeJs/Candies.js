'use strict';

const fs = require('fs');

const fileStream = fs.createReadStream('CandiesTC.txt');

const readline = require('readline');

const rl = readline.createInterface({
    input:  fileStream,
    output: process.stdout
});

rl.resume();

let inputString = '';
let currentLine = 0;

rl.on('line', inputStdin => {
    inputString += inputStdin + "\n";
});

rl.on('close', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the candies function below.
function candies(n, arr) {

    //4 6 4 5 6 2
    let count = 1; // 1
    let currentCandyCount = 1; // 1
    let assignedCandyCountWhenDStarts = 1;
    let continuousDecreasingStreak = 1; // 0
    for (var idx = 1; idx < n; ++idx) { // 1, 2
        let prev = arr[idx - 1]; // 4, 6, 5
        let current = arr[idx]; // 6, 4, 5
        if (prev < current) {
            currentCandyCount += 1; // 2
            if (continuousDecreasingStreak > assignedCandyCountWhenDStarts) { // 0
                count += continuousDecreasingStreak - assignedCandyCountWhenDStarts;
            }
            continuousDecreasingStreak = 1;
            assignedCandyCountWhenDStarts = 1;
        }
        else if (prev >= current) {
            if (continuousDecreasingStreak == 1){
                assignedCandyCountWhenDStarts = currentCandyCount;
                currentCandyCount = 1;
            }
            else
                currentCandyCount++;
            continuousDecreasingStreak++; //1
        }
        count += currentCandyCount; // 3, 4
    }

    if (continuousDecreasingStreak > assignedCandyCountWhenDStarts)
        count += continuousDecreasingStreak - assignedCandyCountWhenDStarts;
    return count;

}

function main() {
    const ws = process.stdout;

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
