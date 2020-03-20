'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    //    return inputString[currentLine++];
    return "4 6 5 3 3 1";
}

/*
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {
    // Write your code here
    a.sort();
    var maxCount = 0;
    var continuousCounts = [0, 0];
    var currentNumber = a[0];
    continuousCounts[0] = 1;
    for (var idx = 1; idx < a.length; ++idx) {
        if (currentNumber == a[idx]) {
            continuousCounts[0]++;
        }
        else if (currentNumber + 1 == a[idx]) {
            continuousCounts[1]++;
        }
        else if (currentNumber + 2 == a[idx]) {
            continuousCounts[0] = continuousCounts[1];
            continuousCounts[1] = 1;
            currentNumber = currentNumber + 1;
        }
        else {
            continuousCounts = [1, 0];
            currentNumber = a[idx];
        }

        var currentcount = continuousCounts[0] + continuousCounts[1];
        if (currentcount > maxCount) {
            maxCount = currentcount;
        }
    }
    return maxCount;
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = 6;//parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = pickingNumbers(a);

    process.stdout.write(result + '\n');

    process.stdout.end();
}

main();