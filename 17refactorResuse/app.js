console.log("starting app");

// fs(file system) is a node module
const fs = require("fs");

// _.isString is a function from lodash, Goto lodash.com then documentation and search for it
const _ = require("lodash");

const yargs = require("yargs");

// ./points to the current directory
const notes = require("./notes.js");

// yargs.argv is where the yargs library stores its version of the arguments that your app ran with
const argv = yargs.argv;

var command = argv._[0];
// in process object argv is like an argument vector or argument array : it shows the location of the node.exe file
// location of folder having the app.js and other command line argument given like node app.js remove
console.log('Command: ', command);

console.log('Yargs:', argv);

if (command === 'add'){

  var note = notes.addNote(argv.title,argv.body);

  if(!note){
    console.log("sorry your note title is already used");
  }else{
    console.log("note has been added");
    console.log("-------------------");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  }
}
else if (command ==='list') {
  notes.getAll();
}
else if (command ==='read') {
  notes.getNote(argv.title);
}
else if (command ==='remove') {
  notes.removeNote(argv.title);
}
else{
  console.log('command not recognized');
}

// note: parsing is much more easier using yargs as in this case above without yargs when we give node app.js remove --title "secrets2"
// node.exe is the first argument and location the second ,--title the third and "secrets2" is the fourth, Now parsing certain types of
// command line arguments like key value pairs becomes much more difficult so we use yargs.
