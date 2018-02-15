// var obj = {
//   name:"Mayank"
// }
// // JSON.stringify converts an object into a string
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);
//
// // JSON.parse converts a string into an object.
// var string ='{"name":"Mayank","designation":"node.js developer"}';
// var person = JSON.parse(string);
// console.log(typeof person);
// console.log(person);

// in this second part we are using node module filesystems ("fs")
const fs = require("fs");

var originalNote = {
  name: "Mayank",
  hobby:"music and fitness"
};

// converting Object in JSON
var originalNoteString = JSON.stringify(originalNote);
// creating notes.JSON file and storing it with data from originalNoteString
fs.writeFileSync("notes.JSON",originalNoteString);

//reading the content from notes.JSON file to notesString
var notesString = fs.readFileSync("notes.JSON");
// converting notesString to Object format
var note = JSON.parse(notesString);
console.log(typeof note );
console.log(note.name);
