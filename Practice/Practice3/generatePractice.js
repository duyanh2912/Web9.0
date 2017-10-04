'use strict';

const sort = require("../Practice2/sortPractice");
const search = require("../Practice1/searchPractice");
const fs = require("fs");

function generate(numberOfTestcases, filePath = "./test-data.json") {
    let testCases = [];
    const inputLimit = 500;
    const lowerRange = -10000;
    const upperRange = 10000;

    function addNormalCases(toArray, amount) {
        const result = [...toArray];
        for (let i = 0; i < amount; i++) {
            result.push(normalCase(inputLimit, lowerRange, upperRange))
        }
        return result
    }

    if (numberOfTestcases < 5) {
        testCases = addNormalCases(testCases, numberOfTestcases)
    } else {
        const specialCases = [
            notFound(inputLimit, lowerRange, upperRange),
            firstIndex(inputLimit, lowerRange, upperRange),
            lastIndex(inputLimit, lowerRange, upperRange),
            zeroLength(lowerRange, upperRange),
            middleIndex(inputLimit, lowerRange, upperRange)
        ]
        specialCases.forEach(c => testCases.push(c));
        testCases = addNormalCases(testCases, numberOfTestcases - 5);
    }

    fs.writeFileSync(filePath, JSON.stringify(testCases), 'utf-8');
    return testCases
}

//
//  Test cases generators
//

function normalCase(inputLimit, lowerRange, upperRange) {
    const input = generateInput(0, inputLimit, lowerRange, upperRange);
    let output;

    do { output = randomInteger(0, input.length - 1) }
    while (search(input, input[output]) !== output)

    const target = input[output];

    return {input, target, output};
}

function notFound(inputLimit, lowerRange, upperRange) {
    const input = generateInput(0, inputLimit, lowerRange, upperRange);
    let output = null;
    let target;

    while (output !== -1) {
        target = randomInteger(lowerRange, upperRange);
        output = search(input, target);
    }

    return {input, target, output};
}

function zeroLength(lowerRange, upperRange) {
    return {
        input: [],
        target: randomInteger(lowerRange, upperRange),
        output: -1
    }
}

function firstIndex(inputLimit, lowerRange, upperRange) {
    const input = generateInput(0, inputLimit, lowerRange, upperRange);
    const target = input[0];
    const output = 0;

    return {input, target, output};
}

function lastIndex(inputLimit, lowerRange, upperRange) {
    const input = generateInput(0, inputLimit, lowerRange, upperRange);
    const target = input[input.length - 1];
    const output = input.length - 1;

    return {input, target, output};
}

function middleIndex(inputLimit, lowerRange, upperRange) {
    const input = generateInput(0, inputLimit, lowerRange, upperRange);
    const output = Math.floor(input.length / 2);
    const target = input[output];

    return {input, target, output};
}

//
//  Helper functions
//

function generateInput(minLength, maxLength, lowerRange, upperRange) {
    ;
    const result = [];
    const length = randomInteger(minLength, maxLength)

    for (let i = 0; i < length; i++) {
        result[i] = randomInteger(lowerRange, upperRange);
    }
    return sort(result);
}

function randomInteger(minimum, maximum) {
    return Math.round((Math.random() * (maximum - minimum) + minimum));
}

//
//  Export
//

module.exports = generate;
