
console.log("starting notes.js");

// fs is a core nodemodule so we dont need to install it.
const fs = require("fs");

var addNote = function(title,body){
  console.log("Add note:", title,body);
}

var getAll = function(){
  console.log("getting all notes");
}

var getNote = function(title){
  console.log("read the note: ", title);
}

var removeNote = function(title){
  console.log("remove the note",title)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}
