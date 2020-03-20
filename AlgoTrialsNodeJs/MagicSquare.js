'use strict';

const fs = require('fs');

//process.stdin.resume();
//process.stdin.setEncoding('utf-8');

let inputString = [];
inputString[0] = '5 3 4';
inputString[1] = '1 5 8';
inputString[2] = '6 4 2';

let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

//    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {

    let allPossibleMS = [
        [[8, 1, 6], [3, 5, 7], [4, 9, 2]],
        [[6, 1, 8], [7, 5, 3], [2, 9, 4]],
        [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
        [[2, 9, 4], [7, 5, 3], [6, 1, 8]], 
        [[8, 3, 4], [1, 5, 9], [6, 7, 2]],
        [[4, 3, 8], [9, 5, 1], [2, 7, 6]], 
        [[6, 7, 2], [1, 5, 9], [8, 3, 4]], 
        [[2, 7, 6], [9, 5, 1], [4, 3, 8]],
        ];
    
    let minCost = 10000;
    allPossibleMS.forEach( (pms) =>{

        let cost = 0;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;++j){
                cost += Math.abs( s[i][j] - pms[i][j] );
            }
        }
        if(minCost > cost)
        {
            minCost = cost;
        }
    });

    return minCost;
}

function main() {
    //const ws = console;//fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    console.log(result + '\n');

    //ws.end();
}

main();