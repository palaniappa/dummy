"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
console.log("Welcome");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Count and Element To find", function (inputLine) {
    var elements = inputLine.split(" ");
    var countOfelements = Number(elements[0]);
    var elementToFind = Number(elements[1]);
    rl.question("", function (elementString) {
        var dataElements = elementString.split(" ");
        var dataNumbers = [];
        dataElements.forEach(function (e) {
            dataNumbers.push(Number(e));
        });
        var elementLastIndex = dataNumbers.length;
        for (; elementLastIndex > -1; --elementLastIndex) {
            if (dataNumbers[elementLastIndex] == elementToFind) {
                break;
            }
        }
        rl.write(elementLastIndex.toString());
    });
});
//# sourceMappingURL=LastIndexOfElement.js.map