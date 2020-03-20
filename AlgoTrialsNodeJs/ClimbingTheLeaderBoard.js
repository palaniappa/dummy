'use strict';

const fs = require('fs');

//process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let inputString = '';
// let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// process.stdin.on('end', _ => {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));


// });

// function readLine() {
//     return inputString[currentLine++];
// }

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {

    var result = [];

    const totlaSocre = scores.length;
    var scoreIdex = 0;
    var currentRank = 0;
    var prevScore = -1;
    for (var i = alice.length - 1; i > -1; --i) {

        if (scoreIdex < totlaSocre) {
            while (scoreIdex < totlaSocre && scores[scoreIdex] > alice[i]) {
                if ( prevScore != scores[scoreIdex]) {
                    currentRank++;
                }
                prevScore = scores[scoreIdex];
                scoreIdex++;
            }
        }

        result[i] = currentRank + 1;

        
    }

    return result;
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const scoresCount = parseInt(readLine(), 10);

    const scores = "100 100 50 40 40 20 10".split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    //const aliceCount = parseInt(readLine(), 10);

    const alice = "5 5 5 5 5".split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    process.stdout.write(result.join("\n") + "\n");

    process.stdout.end();
}

main();