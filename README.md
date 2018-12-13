# FAC_guidebook2.0

### User journey:

- User can view existing posts
 -- Pull and display data from db

- Click to add own post
 -- Check if user is logged in

- If not logged in: Prompted to login or signup
 -- (If logged in, take to post form)

- User signs up 
 -- Client side validation - check that password is at least 8 chars, with at least 1 numb, 1 uppercase and 1 lowercase
 -- Server side - Check if user name already exists in the db
 -- If no error, submit form to new row in USERS table with a HASHED password

- User logs in 
 -- Server side - check that username is present in db, then check that the hash of the input matches that user's hashed password.
 -- If success, creates a JWT with info about specific user

- User can now access the post form (protected route)

- User submits post form
 -- Client side - check that fields are not empty
 -- Server side - check if the restaurant already exists/that a post hasn't already been made referencing it
 -- If success, submit form to POSTS table and RESTAURANTS table

- User can view updated home page!



### What we worked on: 

## Day 1: 

- Creating a database on Heroku and linking it to the new repo (this took longer than expected, we're still not sure why!)
- Signup form validation on the client side (unmatching passwords, patterns)
- We spent a long time tracking our callback functions through different files to figure out where to put the login form validation (to compare the password in the database with the password that is submitted)
- whiteboard coding

![img_5081](https://user-images.githubusercontent.com/36998110/49939612-3d049600-fed5-11e8-8b82-a03d61225030.JPG)
![img_5082](https://user-images.githubusercontent.com/36998110/49939613-3d9d2c80-fed5-11e8-8032-57f2ed729284.JPG)
![img_5083](https://user-images.githubusercontent.com/36998110/49939614-3d9d2c80-fed5-11e8-9ea3-fb57c15ea165.JPG)
![img_5084](https://user-images.githubusercontent.com/36998110/49939615-3d9d2c80-fed5-11e8-9cf4-f06fd4e4d0a7.JPG)

## Day 2: 
- User journey
![img_5101](https://user-images.githubusercontent.com/36998110/49939616-3d9d2c80-fed5-11e8-9223-f5a9ecff7e3a.JPG)

- Client-side validation for the sign up page

- Handling the USER LOGIN logic:
-- First step:

```
    const handlerLogin = (req, res) => {
  let body = "";
  req.on("data", function(data) {
    body += data;
  });
  req.on("end", function() {
    const {userName, password} = qs.parse(body);
    console.log(userName, password);

    getData.getUserData((err, result)=>{
      let loggedIn = false;
      if(err){
        console.log(err);
      } else {
        result.forEach((user)=>{
          if(user.name === userName && user.password === password){
            console.log("correct user details");
            loggedIn = true;
            return;
          } else {
            console.log("user doesn't exist!");
          }
        });
        if(!loggedIn){
          res.writeHead(302, {
            Location: "http://localhost:5000/public/login.html"
          });
          res.end();
        } else {
          res.writeHead(302, {
            Location: "http://localhost:5000/public/form.html"
          });
          res.end();
        }
      }
    })
  });
};

```
-- Refactor with bcryptjs?

- We used a promise!

- Signup form validation: 
-- Client side - check that password is at least 8 chars, with at least 1 numb, 1 uppercase and 1 lowercase.
-- Server side - Check is user name already exists in the db

Login form validation:
-- Server side - check that username is present in db, then check that the hash of the input matches that user's hashed password!

Post form validation?


