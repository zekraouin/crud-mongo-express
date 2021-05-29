const express = require('express');
const bodyParser= require('body-parser')
const app = express();

    //db connection
    const MongoClient = require('mongodb').MongoClient ;
    MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true }, { useNewUrlParser: true},(err, client) => {
        if(err) 
        {
            return console.error('not connected to mongo') ;
        }
        console.log('connected to mongo') ;
     var db =client.db("Express") ;

app.use(express.urlencoded({extended:true}))
//setting an html templating engine
app.set('view engine', 'ejs')
//use public folder scripts 
app.use(express.static('public'))
// making json data readable
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//running client server 
app.listen(3000, function() {

});

app.get('/', (req ,res)=>{
    res.sendFile('/home/nasser/learnings/mongodb/mongoexpress/index.html')
}) ;
//insert
app.post('/quotes', (req ,res)=>{
     db.collection('quotes').insertOne(req.body,(err,client)=>{
        if(err) 
        {
            return console.error('not inserted to mongo') 
        }   
     })
    }) ;
app.get('/quotesReading',(req,res)=>{
        //reding from db
        db.collection('quotes').find().toArray()
        .then(results => {
        res.render('index.ejs',{quotes : results}) ;
        })
}) ;
 //updating db
 app.put('/quotes', (req, res) => {
    console.log('hh') ;
  })


   
}) ;

