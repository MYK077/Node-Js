console.log("starting app");

// fs(file system) is a node module
const fs = require("fs");

// _.isString is a function from lodash, Goto lodash.com then documentation and search for it
const _ = require("lodash");

// ./points to the current directory
const notes = require("./notes.js");

// fs.appendFile('greetings.txt',`hey whats going on! are you ${notes.age}`);

var command = process.argv[2];
// in process object argv is like an argument vector or argument array : it shows the location of the node.exe file
// location of folder having the app.js and other command line argument given like node app.js remove
console.log('Command: ', command);
console.log(process.argv);

if (command === 'add'){
  console.log('Adding a new note');
}else if (command ==='list') {
  console.log('listing all notes');
}else if (command ==='read') {
  console.log('fetching a note');
}else if (command ==='remove') {
  console.log('delete a note');
}else{
  console.log('command not recognized');
}

// note: parsing is much more easier using yargs as in this case above without yargs when we give node app.js remove --title "secrets2"
// node.exe is the first argument and location the second ,--title the third and "secrets2" is the fourth, Now parsing certain types of
// command line arguments like key value pairs becomes much more difficult so we use yargs.
