const Queries = require('./models.js');

const addToList = (title) => {
  console.log('title', title)
  Queries.addWatched(title)
  .then((response) => {
    console.log(response)
    return response
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = {addToList}