const dbConnection = require('../database/db_connection.js');

const getRestData = cb => {
  dbConnection.query(`SELECT * FROM restaurants`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};


const getUserData = cb => {
  dbConnection.query(`SELECT * FROM users`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getSpecificUser = (name, cb) => {
  dbConnection.query(`SELECT * FROM users WHERE name = '${name}'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
}

// should be a function here that will check a given argument (Attempted login)
// against db. And then we will call this function in the relevant handler



module.exports = {
  getRestData,
  getUserData,
  getSpecificUser
};
