const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const jsonParser = bodyParser.json()
const port = 3000;
const app = express();

const fileName = './post.json';

const urlencodedParser = bodyParser.json({type: "*/*"})

const getDataAtIndex = (userId, file) => {
  for (const obj of file) {
    if(obj.id === userId) {
      return obj;
    }
  }
  return "id not found";
}


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
      res.status(200)
      res.send("success!")

    } catch (e) {
      console.log("error parsing json", e)
    }
    
  })
});

app.get('/view/:id?', (req, res) => {

  fs.readFile(fileName, 'utf-8', (err, jsonString) => {
    if (err) {
      console.log("file read error", err)
    }
    try{
      const data = JSON.parse(jsonString)
      if(req.params.id) {
        const targetUser = getDataAtIndex(req.params.id, data);
        res.send(targetUser);
      } else {
        res.send(data)
      }
    } catch (e) {
      console.log(e)
    }
  
     
  });
})


app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);