console.log("starting app");

// fs(file system) is a node module
const fs = require("fs");

// os(operating system) is a node module
const os = require("os");

// _.isString is a function from lodash, Goto lodash.com then documentation and search for it
const _ = require("lodash");

// ./points to the current directory
const notes = require("./notes.js");

var res = notes.addNumbers(2,8);

console.log(`result: ${res}`);

// _.isString verify if the value entered is a string or not.
console.log(_.isString(true));
console.log(_.isString("mayank"));

// var user = os.userInfo();

// console.log(user);
// fs.appendFile('greetings.txt',`hey whats going on ${user.username}! you are ${notes.age}`);
