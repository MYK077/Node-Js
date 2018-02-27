
// adding patch route to update todo items
app.patch('/todos/:id',(req,res)=>{
  var id   = req.params.id;
  // body is where the updates are going to be stored
  // if we want to change the todo text we will need to make a patch request
  // the issue here is that someone can send any property along that are not on the todo items for example completed at
  // completedAt is a property that should be updated by us not the user, so to pull of the properties that user updates.
  // text and completed are the properties that will be set by the users
  var body = _.pick(req.body,['text','completed'])

  if(ObjectID.isValid()){
    return res.status(404).send();
  }
  //if body.completed is set by user and is completed
  if(_.isBoolean(body.completed) && body.completed){
  // get time is javascript timeStamp , values less than zero means its in the past
    body.completedAt = new Date().getTime();
  }else{
    body.completed   = false;
    body.completedAt = null;
  }

});
