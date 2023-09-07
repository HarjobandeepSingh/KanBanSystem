const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
// const  ObjectID  = require('mongodb');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

const connectionString = "mongodb+srv://harjobandeepsingh35:pimaDZAJ5F5OX5oY@cluster0.vvutemj.mongodb.net/?retryWrites=true&w=majority";

app.listen(1000, (req,res) => {
    console.log('Server Started');
})


const path = require("path");
const multer = require("multer");




var Users;
MongoClient.connect(connectionString, function(err, succ) {
    if(err) throw err;
    console.log('Db Connected');
    var db = succ.db('KanBanSystemWeb');
    Users = db.collection('User_Data');
    Board = db.collection('Board_Data');
})


app.post('/AddUser', (req,res) => {
     console.log(req.body);
    Users.insertOne(req.body).then((succ) => {
        res.send("ok");
        console.log(req.body)
    })
})


app.post('/Login', (req,res) => {
    console.log(req.body);
    Users.findOne({
        email:req.body.email,
        password:req.body.password,
    }).then((succ) => {
    console.log(req.body.email)
    console.log(req.body.password)
    if(succ){
        console.log("Success!" )
        res.send(JSON.stringify(succ));
        console.log(JSON.stringify(succ))
       
    }else{
        console.log('error');
    }
})
})

app.get('/Boards', (req, res) => {
    Board.find({}).toArray((err, boards) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(boards);
      }
    });
  });
  
  app.post('/Boards', (req, res) => {
    const board = {
      title: req.body.title,
      description: req.body.description,
    };
    Board.insertOne(board, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result && result.ops && result.ops.length > 0) {
          res.send(result.ops[0]);
        } else {
          res.status(500).send('Could not insert new board');
        }
      }
    });
  });
  
  
  




