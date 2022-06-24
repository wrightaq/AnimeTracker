const JustWatch = require('justwatch-api');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'amandawright',
  host: 'localhost',
  database: 'anime',
  password: '',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

const jw = new JustWatch();
const testing = function(testId) {
  return  jw.getTitle('show', testId);
}

const getTitlesById = function(titleIds) {
 const titlePromises = titleIds.map((titleId) => {
    const titleInt = parseInt(titleId.id.slice(2));
    return testing(titleInt);
  })
  return Promise.all(titlePromises);
}

const updateTitles = function(titles) {
  const updatePromises = titles.map(({title, id}) => {
    const sql = `UPDATE data SET title=$1  WHERE id=$2;`
    console.log("title",title, "id",id)
    return pool.query(sql, [title, "ts"+id])
  })
  return Promise.all(updatePromises);
}

const addTitles = async function(position) {
try {
  const sql = `SELECT id FROM data limit 20 offset 220 ;`//use setTimeout with increasing time. use logs to test
  const titleIdResponse = await pool.query(sql);
  const titles = await getTitlesById(titleIdResponse.rows)
  const updates = await updateTitles(titles);
  // console.log(updates)
} catch(e) {
  console.log(e);
}

}

// const seedData = function() {
//   let counter = 0;
//   let timeout = 0;
//   const duration = 2000;
//   while(counter < 1981) {
//     setTimeout(() => {
//       addTitles(counter)
//       counter += 5
//     }, timeout += duration)
//   }
// }
//  addTitles();

module.exports = pool;

