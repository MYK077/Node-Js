// console.log("starting notes.js");

//fs is core node module and need not be installed using npm
const fs =require("fs");

//
var fetchNotes = function(){

  // using try catch coz when the notes_data.JSON is not present, our code doesnot break
  try{
    //reading or fetching content from notes_data.JSON file to notesString and parsing the same into object format to notes array
    //so that we do not loose the data stored earlier in the file
     var notesString = fs.readFileSync('notes_data.JSON');
     return JSON.parse(notesString);
  }catch(e){
      return [];
  }

}

var saveNotes = function(notes){
  //writeFileSync will create a .JSON file if not present already and will store the stringified version from notes array
    fs.writeFileSync("notes_data.JSON",JSON.stringify(notes));
}

// add note function
var addNote = function(title,body){

// creating an array notes so we can push the data from the note object
  var notes = fetchNotes();
  var note = {
    title,
    body
  }

// checking for duplicate titles to avoid any
var duplicateNotes = notes.filter(function(notes){
  return notes.title === title;
})

if(duplicateNotes.length===0){

  //data from note pushed into the array
    notes.push(note);

    saveNotes(notes);

    return note;
}

}

var getAll = function(){
  // fetch all notes
  var notes = fetchNotes();

  return notes;
}

var getNote = function(title){
// fetch notes
  var notes = fetchNotes();
  //filter notes as per given title
  var filterNotes = notes.filter(function(notes){
    return notes.title === title;
  })

  return filterNotes[0];
}

var removeNote = function(title){
  // fetch notes
  var notes = fetchNotes();

  // filter notes ,removing one with title of the arguments
  var filterNotes = notes.filter(function(notes){
    return notes.title !== title;
  })

  // save new notes array.
  saveNotes(filterNotes);

  return notes.length !== filterNotes.length;
}

var logNote = function(note){
  console.log("-------------------");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
