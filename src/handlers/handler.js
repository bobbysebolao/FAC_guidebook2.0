const fs = require("fs");
const path = require("path");
const getData = require("./getData");
const postData = require("./postData");
const qs = require("querystring");
const bcrypt = require("bcryptjs");
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const secret = "charlieIsABitch";

// ----------------------HOME ROUTE ------------also displays existing recommendations from DB----
const handlerHome = (request, response) => {
  const url = request.url;
  console.log(`requesting the home route, url: ${url}`);

  const filePath = path.join(__dirname, "..", "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(`Error: ${error}`);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

// ----------------------PUBLIC ROUTE ------------
const handlerPublic = (request, response, url) => {
  console.log(`requesting the public route, url: ${url}`);
  const extension = url.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript"
  };

  const filePath = path.join(__dirname, "..", "..", url);
  fs.readFile(filePath, (error, file) => {
    let message;
    
    if (error) {
      console.log(`Error: ${error}`);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, we'v had a problem on our end</h1>");
    } else {
      console.log(url);
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
  }
})
}
 
const handlerRestaurants = (request, response) => {
  getData.getRestData((err, res) => {
    if (err) {
      return console.log(err, "error");
    }
      const restaurantsData = JSON.stringify(res);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(restaurantsData);
    })
  }

const handlerUsers = (request, response) => {
  getData.getUserData((err, res) => {
    if (err) {
      return console.log(err, "error");
    }
    const userData = JSON.stringify(res);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(userData);
  });
};


// THIS IS THE ROUTE WHERE WE HANDLE THE VALUES FROM THE LOGIN SUBMIT.
// WE THEN WANT TO COMPARE loginDetails VARIABLE TO OUR DB
const handlerLogin = (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    const {userName, password} = qs.parse(body);
    console.log(userName, password);

    getData.getSpecificUser(userName, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('this is what were getting', result[0].password)
        bcrypt.compare(password, result[0].password, (err, passwordsMatch) => {
          console.log(password)
          if (err) {
            res.statusCode = 500
            res.end("error logging in")
            return;
          }
            if (!passwordsMatch) {
            res.statusCode = 403
            res.end("Username or password doesn't exist")
            return;
            } else {
              const cookie = sign(result[0].id, secret);
              res.writeHead(302, {
                Location: "http://localhost:5000/public/form.html",
                'Set-Cookie': `jwt=${cookie}; HttpOnly`
              });
              res.end("logged in!!");
            }
          });
        }
      })
    })
  };

// should be a function to handle the SIGNUP LOGIC
// will update the users table

// ----------------------POST ROUTER------------
const handlerSubmit = (req, res) => {
  var body = "";
  req.on("data", function(data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    // if (body.length > 1e6)
    //     req.connection.destroy();
  });
  req.on("end", function() {
    let post = qs.parse(body);
    // use post['blah'], etc.
    console.log(post);

    // instead, below we should call one big function from our postData
    // that submits all of the data into posts table and restaurants table
    // (inc. recognises and submits the logged-in users ID as foreign key from users table)
    // (users table is only updated by submits from sign up page)

    postData.postDataRest(
      post.placeName,
      post.address,
      post.review,
      post.imageUrl,
      (err, response) => {
        
        if (err) {
          return console.log(err, "Error posting rest data");
        }
        res.writeHead(302, {
          Location: "http://localhost:5000"
        });
        res.end();
      })
  
    postData.postDataUser(
      post.userName,
      post.password,
      (err, response) => {
        if (err) {
          return console.log(err, "Error posting user data");
        }
        res.writeHead(302, {
          Location: "http://localhost:5000"
        });
        res.end();
      }
    )
    })
}
// THIS IS THE ROUTE WHERE WE HANDLE THE VALUES FROM THE SIGN UP.
// WE THEN WANT TO COMPARE username VARIABLE TO OUR DB: exists or not?
const handlerSignUp = (req, res) => {
  let body = "";
  req.on("data", data => {
    body += data;
  });
  req.on("end", () => {

    // check if user exists in db using getData
    const {userName, password} = qs.parse(body);
    console.log(userName, password);
    getData.promiseSpecificUser(userName)
      .then((result)=> {
        console.log("promise result:", result);
        if(result.length === 0){
          postData.postDataUser(userName, password, (err, result2) => {
            if (err) {
              console.log(err);
            } else {
              console.log('success', result2);
              res.writeHead(302, {
              Location: "http://localhost:5000/public/login.html"
            });
            res.end();
            }
        });
      } else {
        console.log("that user already exists!");
        res.writeHead(302, {
        Location: "http://localhost:5000/public/sign-up.html"
      });
        res.end();
      }
      })
      .catch((err)=> {
        console.log("promise error", err);
      })
  });
}

const handlerAuthenticate = (req, res) => {
  if(req.headers.cookie){
    console.log("here is your cookie", req.headers.cookie);
    res.writeHead(302, {Location: "./public/form.html"});
    res.end();
  } else {
    console.log("COOKIE?", req.headers.cookie);
    res.writeHead(302, {Location: "./public/sign-up.html"});
    res.end();
  }
}



module.exports = {
  handlerHome,
  handlerPublic,
  handlerRestaurants,
  handlerSubmit,
  handlerUsers,
  handlerSignUp,
  handlerLogin,
  handlerAuthenticate
}
