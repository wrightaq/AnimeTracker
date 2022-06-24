const pool = require('../database/forData.js');
const JustWatch = require('justwatch-api');


// const addTitle = function(title) {
//   const jw = new JustWatch();
//   return jw.search(title)
//   .then((response) => {
//     if (response.items.length > 0) {
//       const sql
//     }
//     console.log(response.items[0].id)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }

const addWatched = function(title) {
  console.log('model title', title)
  const sql =  'UPDATE data SET watched=true WHERE title=$1;'
  return pool.query(sql, [title])
    .then((response) => {
      // if (response.rows.length === 0) {
      //   console.log(addTitle(title))
      // }
      // else {
        console.log(response)
      // }
    })
    .catch((err) => {
      console.log(err)
    })
};

const getList = function() {
  const sql = 'SELECT * FROM data WHERE watched=true ORDER BY title'
  return pool.query(sql)
  .then((response) => {
    return response
  })
  .catch((err) => {
    console.log(err)
  })
}

const getActorByCharacter = function(character) {
  console.log('pg char', character)
  const sql = `SELECT name FROM data WHERE character LIKE '%' || $1 || '%'`
  return pool.query(sql, [character])
  .then((response) => {
    console.log(response.rows[0].name)
    return response.rows[0].name
  })
  .catch((err) => {
    console.log(err)
  })
}

const getShowsByActor = function(actor) {
  const sql = 'SELECT title, watched FROM data WHERE name=$1 and title is NOT NULL ORDER BY watched=true, title;';
  return pool.query(sql, [actor])
  .then((response) => {
    console.log(response.rows)
    return response.rows
  })
  .catch((err) => {
    console.log(err)
  })
}

const getActorsByTitle = function(title) {
  const sql = 'SELECT * FROM data WHERE title=$1 ORDER BY character';
  return pool.query(sql, [title])
  .then((response) => {
    console.log(response.rows)
    return response.rows
  })
  .catch((err) => {
    console.log(err)
  })
}


module.exports = {addWatched, getList, getActorByCharacter, getShowsByActor, getActorsByTitle}