import express from 'express';
import bodyParser from 'body-parser'
import fs from 'fs';

const port = 3000;
const app = express();
const fileName = './post.json';

const urlencodedParser = bodyParser.json({type: "*/*"})

//returns user object that matches the id passed
const getDataAtIndex = (userId, file) => {
  for (const obj of file) {
    if(obj.id === userId) {
      return obj;
    }
  }
  return "id not found";
}

//takes a new user, parses the file and adds the new user into the file
app.post('/add', urlencodedParser,  (req, res) => {
  fs.readFile(fileName, 'utf-8', (err, jsonString) => {
    if (err) {
      console.log("file read error", err)
    }
    try{
      const data = JSON.parse(jsonString)
      data.push(req.body)
      
      fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
        if (err) {
          console.log("error writing file", err)
        } else {
          console.log('file written!', data)
        }
      })

      fs.readFile(fileName, 'utf-8', (err, jsonString) => {
        try{
          const data = JSON.parse(jsonString)
            res.status(200)
            res.send(data)
         } catch (e) {
          console.log(e)
        }
      })

    } catch (e) {
      console.log("error parsing json", e)
    }
    
  })
});

//returns user with id that is passed, if no user id passed returns the entire file
//needs error handling if user isnt found

app.get('/view/:id?', (req, res) => {

  fs.readFile(fileName, 'utf-8', (err, jsonString) => {
    if (err) {
      console.log("file read error", err)
    }
    try{
      const data = JSON.parse(jsonString)
      if(req.query.id) {
        const targetUser = getDataAtIndex(req.query.id, data);
        
        res.status(200)
        res.send(targetUser);
      } else {
        res.status(200)
        res.send(data)
      }
    } catch (e) {
      console.log(e)
    }
  
     
  });
})


//takes an id as a param and some data that needs to be updated for that user id and updates it
app.patch('/edit/:id', urlencodedParser, (req, res) => {

  const userId = req.params.id;
  const dataToUpdate = req.body;
  fs.readFile(fileName, 'utf-8', (err, jsonString) => {
    if (err) {
      console.log("file read error", err)
    }
    try{
      //parse data to json when file is read
      const data = JSON.parse(jsonString)
      //get the user which needs to be updated 
      const targetUser = getDataAtIndex(userId, data);
      //update that user with the new data
      const updatedTargetUser = {...targetUser, ...dataToUpdate};
      //update the parsed json file with the updated user
      const indexToUpdate = data.findIndex((obj) => obj.id === userId)
      data.splice(indexToUpdate, 1, updatedTargetUser)
      //write to the file with the data that has the updated user info
      fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
        if (err) {
          console.log("error writing file", err)
        } 
      })
      res.status(200)
      res.send(data)
    } catch (e) {
      console.log(e)
    }
  })
});



app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
export default app;