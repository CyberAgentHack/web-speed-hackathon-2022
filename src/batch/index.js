const zenginCode = require("zengin-code");
var fs = require('fs');

const res = Object.fromEntries(Object.entries(zenginCode).map(([_, { branches, name }]) => [_, { branches, name }]))

fs.writeFileSync('./src/batch/fmt-zengin-code.json', JSON.stringify(res))