// var router = require('./routes.js');
const express = require ('express');
// const path = require("path");
// const controllers = require('./controllers.js')
const Queries = require('./models.js')

const app = express();

//middleware
app.use(express.json());
app.use(express.static('client/dist'));
app.use(express.urlencoded({extended: true}));

const PORT = 3000 || process.env.PORT;

app.get('/title', (req, res) => {
  console.log('express req', req.query)
  Queries.getActorsByTitle(req.query.title)
  .then((response) => {
    console.log('express response', response)
    res.send(response)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get('/actor', (req, res) => {
  Queries.getShowsByActor(req.query.character)
  .then((response) => {
    res.send(response)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get('/character', (req, res) => {
  Queries.getActorByCharacter(req.query.character)
  .then((response) => {
    console.log('express response', response)
    res.send(response)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get('/watched', (req, res) => {
  console.log(req.query)
  Queries.getList()
  .then((response) => {
    console.log('res', response)
    res.send(response)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.post('/watched', (req, res) => {
  Queries.addWatched(req.body.title)
  .then((response) => {
    res.send(response);
  })
  .catch((error) => {
    console.log(error)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})