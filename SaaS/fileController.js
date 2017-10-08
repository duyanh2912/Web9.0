"use strict";
const fs = require("fs");

const readDataFromFile = (filename) => {
    let data = fs.readFileSync(filename, "utf-8");
    return JSON.parse(data);
};

const writeDataToFile = (filename, data) => {
    let json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(filename, json, "utf-8");
};

module.exports = {
    readDataFromFile,
    writeDataToFile
};