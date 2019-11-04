const app = require('express')()
const cors = require('cors')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const data = require('./data.json')
app.use(cors())
app.use(bodyParser.json())
const PORT = 8080


app.get('/', (req, res) => {
    res.end('Server running')
})

/* app.get("/units", (req, res) => {
   let page = parseInt(req.query.page)
   let limit = parseInt(req.query.limit)

   if(!page && !limit){
      page = 0;
      limit = 5;
   }

   let startIndex = page * limit
   let endIndex = (page + 1) * limit

   let resultIndex = data.slice(startIndex,endIndex)
   res.json(resultIndex);
}); */


app.get("/units", (req, res) => {
   let page = parseInt(req.query.page)
   let limit = parseInt(req.query.limit)

   if(!page && !limit){
      page = 1;
      limit = 5;
   }
   
   let startIndex = (page -1) * limit
   let endIndex = page * limit

   let results = {} 
   console.log(data.length);
   if(endIndex < data.length){
   results.next = {
      page : page + 1,
      limit : limit
   }
   }

   if(startIndex > 0){
   results.previous = {
      page : page - 1,
      limit : limit
   }
}

   results.results = data.slice(startIndex,endIndex)
   res.json(results);
});

app.get("/units/:id", (req, res) => {
   const itemId = req.params.id;
   const item = data.find(_item => _item.id == itemId);

   if (item) {
      res.json(item);
   } else {
      res.json({ message: `item ${itemId} doesn't exist`})
   }
});

app.listen(process.env.PORT || PORT, () =>{
console.log('Server http://localhost:'+ PORT + ' running.')  
})
