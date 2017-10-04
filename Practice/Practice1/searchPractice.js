'use strict';

function search(input, target) {
    if (!input.length) return -1;

    // Binary Search Algorithm
    function helper(input, target, startIndex, endIndex) {
        if (input[startIndex] > target || input[endIndex] < target) return -1


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

    return helper(input, target, 0, input.length - 1);
}

search([-9755, -9755, -9729, -9421, -9417, -9404, -9218, -8991, -8840, -8790, -8522, -8466, -8465, -8415, -8410, -8303, -8248, -8231, -8194, -7879, -7226, -7036, -6784, -6697, -6617, -6592, -6401, -6315, -6144, -5983, -5955, -5666, -5506, -5473, -5440, -5426, -5328, -5270, -5069, -4930, -4834, -4749, -4615, -4530, -4486, -4464, -4375, -4351, -4330, -4314, -4215, -4129, -3991, -3925, -3891, -3718, -3458, -3374, -3342, -3011, -2988, -2964, -1846, -1353, -1122, -659, -587, 112, 259, 380, 490, 540, 1058, 1349, 1429, 1767, 1935, 1992, 2118, 2246, 2608, 2631, 2742, 2807, 3094, 3169, 3224, 3308, 3697, 3991, 4203, 4246, 4468, 4523, 4637, 4661, 4796, 4899, 5558, 5562, 5699, 5726, 5985, 6102, 6375, 6535, 6574, 6753, 6930, 6965, 6974, 7174, 7256, 7354, 8027, 8461, 8588, 8819, 8968, 8992, 9284, 9295, 9506, 9628, 9629, 9642, 9694, 9749, 9878, 9922],
    -2075)

module.exports = search;
