'use strict';
const sort = require("../Practice2/sortPractice");

function search(input, target) {
    function helper(input, target, startIndex, endIndex) {
        if (startIndex === endIndex && input[startIndex] !== target) {
            return -1;
        }

        const middleIndex = Math.floor((endIndex + startIndex) / 2);
        const middleValue = input[middleIndex];

        if (middleValue === target) {
            return middleIndex;
        }
        else if (target < middleValue) {
            return helper(input, target, startIndex, middleIndex - 1);
        }
        else if (target > middleValue) {
            return helper(input, target, middleIndex + 1, endIndex)
        }
    }

    return helper(sort(input), target, 0, input.length - 1);
}

module.exports = search;
