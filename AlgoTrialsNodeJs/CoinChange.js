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

rl.on('line', function (inputStdin) {
    inputString += inputStdin + "\n";
});

rl.on('close', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'getWays' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. LONG_INTEGER_ARRAY c
 */

function getWays(n, c) {
    // Write your code here
    //let dp = {};
    //return getWaysImpl(n, c, dp);

    let r = Array(n+1).fill(0)
    r[0] = 1
    c.forEach(x => {
        for(let j = x; j <= n; j++) {
            r[j] += r[j-x]
        }
    })
    return r[n]
}

function getWaysImpl(n, c, dp) {
    
    if (n <= 0 || c.length == 0)
        return 0;
    let key = n + ":" + c.join(",");
    if (dp[key] != undefined && dp[key] != null)
        return dp[key];

    let count = 0;
    for (var idx = 0; idx < c.length; ++idx) {
        let remainingC = [];
        remainingC = remainingC.concat(c.slice(0, idx), c.slice(idx + 1));
        let currentVal = c[idx];
        if (currentVal == n) {
            count++;
        }
        else if (currentVal < n) {
            let remainingN = n - currentVal;
            let poosibleCount = getWaysImpl(remainingN, remainingC, dp);
            if (poosibleCount > 0) {
                count += poosibleCount;
            }
        }
    }
    dp[key] = count;
    return count;
}

function main() {
    const ws = process.stdout;

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const c = readLine().replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));

    // Print the number of ways of making change for 'n' units using coins having the values given by 'c'

    const ways = getWays(n, c);

    ws.write(ways + '\n');

    ws.end();
}
