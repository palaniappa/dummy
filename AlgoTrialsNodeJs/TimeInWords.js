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
    inputString += inputStdin + '\n';
});

rl.on('close', _ => {
    console.log('end');
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the timeInWords function below.
function timeInWords(h, m) {

    let result = "";

    let numberToString = {};
    numberToString[""]

}

function main() {
    const ws = process.stdout;//fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
