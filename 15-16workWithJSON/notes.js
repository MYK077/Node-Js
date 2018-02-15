console.log("starting notes.js");

//fs is core node module and need not be installed using npm
const fs =require("fs");

// add note function
var addNote = function(title,body){

// creating an array notes so we can push the data from the note object
  var notes = [];
  var note = {
    title,
    body
  }

// using try catch coz when the notes_data.JSON is not present, our code doesnot break
try{
  //reading or fetching content from notes_data.JSON file to notesString and parsing the same into object format to notes array
  //so that we do not loose the data stored earlier in the file
   var notesString = fs.readFileSync('notes_data.JSON');
   notes = JSON.parse(notesString);
}catch(e){

}

// checking for duplicate titles to avoid any
var duplicateNotes = notes.filter(function(notes){
  return notes.title === title;
})

if(duplicateNotes.length===0){

  //data from note pushed into the array
    notes.push(note);

  //writeFileSync will create a .JSON file if not present already and will store the stringified version from notes array
    fs.writeFileSync("notes_data.JSON",JSON.stringify(notes));

}

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
