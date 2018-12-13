const databaseConnection = require('../database/db_connection');
const bcrypt = require("bcryptjs");

const hashPassword = (password, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        bcrypt.hash(password, salt, cb);
      }
    });
  };

const postDataRest = (name, location, review, img_url, cb) => {

    databaseConnection.query(
        'INSERT INTO restaurants (name, location, review, img_url) VALUES ($1, $2, $3, $4)',
        [name, location, review, img_url],
        (err, res) => {
            if(err) {
                return cb(err);
            } else {
                cb(null, res);
            }
        }
    );
};

const postDataUser = (name, password, cb) => {
    hashPassword(password, (err, hashedPassword) => {
        if (err) console.log(err);
        databaseConnection.query(
            'INSERT INTO users (name, password) VALUES ($1, $2)',
            [name, hashedPassword],
            (error, res) => {
                if(err) {
                    return cb(error);
                } else {
                    cb(null, res);
                }
            }
        );
    });       
}

// testing postDataUser

// postDataUser('noIdea', 'password', (err, res) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(res);
// });

// const postLogin = () => {
//
// }




module.exports = {
    postDataRest,
    postDataUser
}
