'use strict';

const fs = require('fs');

// process.stdin.resume();
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

//     main();
// });

// function readLine() {
//     return inputString[currentLine++];
// }

main();

// Complete the designerPdfViewer function below.
function designerPdfViewer(h, word) {

    var hMax = 0;
    word = word.toUpperCase();
    var idx=0;
    for(;idx < word.length; ++idx){
        var hIndex = word.charCodeAt(idx) - 65;
        if(h[hIndex] > hMax){
            hMax = h[hIndex];
        }
    }
    return idx*hMax;
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = "1 3 1 3 1 4 1 3 2 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 7".split(' ').map(hTemp => parseInt(hTemp, 10));

    const word = "zaba";

    let result = designerPdfViewer(h, word);

    process.stdout.write(result + "\n");

    process.stdout.end();
}
