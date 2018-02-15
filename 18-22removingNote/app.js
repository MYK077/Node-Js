// console.log("starting app");

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

if (command === 'add'){

  var note = notes.addNote(argv.title,argv.body);

  if(!note){
    console.log("sorry your note title is already used");
  }else{
    console.log("note has been added");
    notes.logNote(note);
  }
}
else if (command ==='list') {
   var listNotes = notes.getAll();

   console.log(`x---list of all ${listNotes.length} notes---x`);
   listNotes.forEach(function(allnotes){
     notes.logNote(allnotes);
   })
}
else if (command ==='read') {
  var note = notes.getNote(argv.title);
   console.log(note.title);
  if (note.length === 0){
    console.log("sorry note not found");
  } else{
    console.log("please find your note");
    notes.logNote(note);
  }
}
else if (command ==='remove') {
  var notesRemoved = notes.removeNote(argv.title);

  if(notesRemoved){
    console.log("the note has been removed")
  }else{
    console.log("note not found")
  }

}
else{
  console.log('command not recognized');
}

// note: parsing is much more easier using yargs as in this case above without yargs when we give node app.js remove --title "secrets2"
// node.exe is the first argument and location the second ,--title the third and "secrets2" is the fourth, Now parsing certain types of
// command line arguments like key value pairs becomes much more difficult so we use yargs.
