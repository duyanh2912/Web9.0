'use strict';

function sort(input) {
    if (!input.length) return input;

    // Counting Sort Algorithm
    const {min, max} = input.reduce((obj, current) => {
            if (current < obj.min) obj.min = current;
            if (current > obj.max) obj.max = current;
            return obj;
        }, {
            min: input[0],
            max: input[0]
        }
    );

    const helper = input
        .map(number => number - min)
        .reduce(
            (acc, number) => {
                acc[number] ? acc[number]++ : acc[number] = 1;
                return acc;
            },
            new Array(max - min).fill(0))
        .reduce(
            (acc,number,index,arr) => {
                let result = acc || [...arr];
                if (!index) return result;

                const previous = result[index-1];
                result[index] = previous + number;
                return result;
            }, null
        );

    return input.reduce((acc, number) => {
        helper[number - min]--;
        acc[helper[number - min]] = number;
        return acc;
    }, [])
}

module.exports = sort;
