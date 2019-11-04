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

app.get("/units", (req, res) => {
   const page = parseInt(req.query.page)
   const limit = parseInt(req.query.limit)

   const startIndex = page * limit
   const endIndex = (page + 1) * limit

   const resultIndex = data.slice(startIndex,endIndex)
   res.json(resultIndex);
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
