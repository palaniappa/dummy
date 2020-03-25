'use strict';

const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.resume();

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;


rl.on('line', function (data) {
    input_stdin += data + "\n";
});

rl.on('close', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return inputString[currentLine++];
}




function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function passwordCracker(pass, attempt) {
    // Complete this function
    let dp = {};
    return passwordCrackerImpl2(pass, attempt,dp);
}

function passwordCrackerImpl2(pass, attempt, dp){

    if(dp[attempt]){
        return dp[attempt];
    }

    let result = "WRONG PASSWORD";
    let remainingAttempt = attempt;
    for (var i = 0; i < pass.length; ++i) {
        let idx = remainingAttempt.indexOf(pass[i]);
        if (idx != -1) {
            let left = remainingAttempt.substr(0, idx);
            let right = remainingAttempt.substr(idx + pass[i].length);
            let leftResult = "", rightResult = "";
            if (left != "") {
                leftResult = passwordCrackerImpl2(pass, left, dp);
            }
            if (leftResult != "WRONG PASSWORD" && right != "") {
                rightResult = passwordCrackerImpl2(pass, right, dp);
            }
            if (leftResult != "WRONG PASSWORD" && rightResult != "WRONG PASSWORD") {
                result = "";
                if(leftResult != ""){
                    result = leftResult + " ";
                }
                result =  result + pass[i];
                if(rightResult != ""){
                    result = result + " " + rightResult;
                } 
                break;
            }
        }
    }
    dp[attempt] = result;
    return result;
}

function passwordCracker2(pass, attempt) {
    // Complete this function
    let trie = constructTrie(pass);
    let wordList = [];
    let dp = {};
    let possible = traverseTrie(attempt, trie, null, wordList, dp, 0)
    if (possible == true) {
        return wordList.join(' ');
    }
    return "WRONG PASSWORD";
}

function traverseTrie(attempt, trie, currentNode, wordList, dp, idx) {
    let remainingAttempt = attempt.substr(idx);
    if (dp[remainingAttempt]) {
        dp[remainingAttempt].words.forEach(w => {
            wordList.push(w);
        });
        return true;
    }


    if (remainingAttempt == "") {
        if (currentNode && currentNode.word) {
            wordList.push(currentNode.word);
            return true;
        }
        return false;
    }
    let c = remainingAttempt.charAt(0);
    let nextNode = null;
    if (!currentNode) {
        nextNode = trie[c];
    }
    else {
        nextNode = currentNode.children[c];
    }

    if (currentNode && currentNode.word) {
        let newWords = [];
        wordList.forEach(w => {
            newWords.push(w);
        });
        newWords.push(currentNode.word);
        let constructedAttempt = attempt.substr(0, idx);
        dp[constructedAttempt] = { words: newWords };
    }

    let result = false;

    if (nextNode) {
        result = traverseTrie(attempt, trie, nextNode, wordList, dp, idx + 1);
    }

    if (result == false && currentNode && currentNode.word) {
        wordList.push(currentNode.word);
        result = traverseTrie(attempt, trie, null, wordList, dp, idx);
        if (!result) {
            wordList.pop();
        }
    }

    return result;

}

function constructTrie(pass) {
    let trie = {};
    pass.forEach(p => {
        let currentTrie = null;
        let currentTrieLastNode = null;
        let chars = p.split('');
        chars.forEach(c => {
            if (!currentTrie) {
                if (!trie[c]) {
                    trie[c] = {};
                    trie[c].char = c;
                    trie[c].children = {};
                    trie[c].word = null;
                }
                currentTrie = trie[c];
                currentTrieLastNode = trie[c];
            }
            else {
                if (!currentTrieLastNode.children[c]) {
                    currentTrieLastNode.children[c] = {};
                    currentTrieLastNode.children[c].char = c;
                    currentTrieLastNode.children[c].children = {};
                    currentTrieLastNode.children[c].word = null;
                }
                currentTrieLastNode = currentTrieLastNode.children[c];
            }
        });
        if (currentTrieLastNode) {
            currentTrieLastNode.word = p;
        }
    });
    return trie;
}


function main() {
    const ws = process.stdout;

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const passwords = readLine().replace(/\s+$/g, '').split(' ');

        const loginAttempt = readLine();

        const result = passwordCracker(passwords, loginAttempt);

        ws.write(result + '\n');
    }

    ws.end();
}
