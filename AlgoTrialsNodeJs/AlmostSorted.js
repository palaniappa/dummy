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

// Complete the almostSorted function below.
function almostSorted(arr) {

    const INCR = "increasing";
    const DECR = "decreasing";
    const UNKNOWN = "unknown";

    let sequences = [];
    let seqIdx = 0;
    sequences[seqIdx] = {};
    sequences[seqIdx].count = 1;
    sequences[seqIdx].direction = UNKNOWN;
    sequences[seqIdx].startIdx = 0;

    let currentItem = arr[0];
    for (var idx = 1; idx < arr.length; ++idx) {
        if (sequences[seqIdx].direction == UNKNOWN) {
            sequences[seqIdx].direction = arr[idx] >= arr[idx - 1] ? "increasing" : "decreasing";
            sequences[seqIdx].count += 1;
        }
        else if ((sequences[seqIdx].direction == INCR && arr[idx] < arr[idx - 1]) ||
            (sequences[seqIdx].direction == DECR && arr[idx] > arr[idx - 1])) {
            seqIdx++;
            sequences[seqIdx] = {};
            sequences[seqIdx].startIdx = idx;
            sequences[seqIdx].count = 1;
            sequences[seqIdx].direction = UNKNOWN;
        } else {
            //same values or in the right order
            sequences[seqIdx].count += 1;
        }
        if(seqIdx > 2)
            break;
    }

    let result = "no";
    if (seqIdx < 3) {
        if (seqIdx == 2 && sequences[2].direction == UNKNOWN) {
            sequences[2].direction = INCR;
        }
        if (seqIdx == 2 && sequences[0].direction == INCR && sequences[1].direction == INCR && sequences[2].direction == INCR) {
            let no1Idx = sequences[1].startIdx - 1;
            let no2Idx = sequences[2].startIdx;
            if (arr[no1Idx - 1] <= arr[no2Idx] && arr[no2Idx + 1] >= arr[no2Idx] &&
                (sequences[2].count == 1 || (arr[no2Idx - 1] <= arr[no1Idx] && arr[no2Idx + 1] >= arr[no1Idx]))) {
                result = "yes \nswap " + (no1Idx + 1) + " " + (no2Idx + 1);
            }
        }
        else if (seqIdx == 2 && sequences[0].direction == INCR && sequences[1].direction == DECR && sequences[2].direction == INCR) {
            let st = (sequences[1].startIdx);
            let end = sequences[1].count + st;
            if(arr[end] > arr[st-1])
                result = "yes \nreverse " + st + " " + end;
        } else if (seqIdx == 1) {
            if (sequences[1].direction == UNKNOWN) {
                sequences[1].direction = INCR;
            }

            if (sequences[0].direction == INCR && sequences[1].direction == INCR) {
                //swap
                let no1Idx = sequences[1].startIdx - 1;
                let no2Idx = sequences[1].startIdx;

                if (arr[no1Idx - 1] <= arr[no2Idx]  &&
                    (sequences[1].count == 1 || (arr[no2Idx - 1] <= arr[no1Idx] && arr[no2Idx + 1] >= arr[no1Idx]))) {
                    result = "yes \nswap " + (no1Idx + 1) + " " + (no2Idx + 1);
                }
            }
            else {
                let revSeqIndex = sequences[0].direction == DECR ? 0 : 1;
                let st = sequences[revSeqIndex].startIdx;
                let end = sequences[revSeqIndex].count + st;
                if(end == arr.length || arr[end] > arr[st-1])
                    result = "yes \nreverse " + st + " " + end;
            }
        } else if (seqIdx == 0 && sequences[0].direction == DECR) {
            let st = sequences[0].startIdx + 1;
            let end = sequences[0].count;
            if (sequences[0].count > 2) {
                if(end == arr.length || arr[end] > arr[st-1])
                    result = "yes \nreverse " + st + " " + end;
            }
            else {
                result = "yes \nswap 1 2";
            }
        }
    }
    process.stdout.write(result);

}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
