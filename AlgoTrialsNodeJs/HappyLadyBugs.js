'use strict';

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the happyLadybugs function below.
function happyLadybugs(b) {

    let sequence = {};
    sequence["_"] = {};
    sequence["_"].count = 0;
    sequence["_"].lastIdx = -1;
    let allContinuous = true;
    for(var i=0;i<b.length;++i){
        let c = b[i];
        if(sequence[c] == undefined){
            sequence[c] = {};
            sequence[c].count = 0;
            sequence[c].lastIdx = i;
        }
        else {
            if(sequence[c].lastIdx + 1 != i ){
                allContinuous = false;
            }
        }
        sequence[c].count += 1;
        sequence[c].lastIdx = i;
    }

    let possible = true;
    Object.keys(sequence).forEach( p =>{
        if(p != "_" && sequence[p].count == 1){
            possible = false;
        }
    });

    if(possible == true && ( sequence["_"].count > 0 || allContinuous)){
        return "YES";
    }
    return "NO";
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const g = parseInt(readLine(), 10);

    // for (let gItr = 0; gItr < g; gItr++) {
    //     const n = parseInt(readLine(), 10);

    //     const b = readLine();

    //     let result = happyLadybugs(b);

    //     ws.write(result + "\n");
    // }

    // ws.end();

    happyLadybugs("RRRR");
}

main();
