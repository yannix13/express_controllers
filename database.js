const mysql = require("mysql2/promise");
require("dotenv").config();


const database = mysql.createPool({
    host: process.env.DB_HOST, // address of the server
    port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = database;

//module.exports = {database};

// database
// .getConnection()
// .then(() => {
// console.log("Can reach database");
// })
// .catch((err) => {
// console.error(err);
// });

// database
//   .query("select * from movies")
//   .then((result) => {

//     // using destructuring
//    // const [movies] = result;

//     // without destructuring
//     const movies = result[0];

//     console.log(movies);
//   })
//   .catch((err) => {
//     console.error(err);
//   });