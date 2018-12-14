# FAC_guidebook 2.0 :fork_and_knife:

This project is live on heroku: [FAC Guidebook](https://fac-guidebook-20.herokuapp.com/)

## To run the project locally :computer: 

1. Clone of fork the repo 
2. Go into the project folder `cd FAC_guidebook2.0`
3. Run `npm i`
4. Create a file `config.env` in your root directory and save the database credentials in this format: 

    ```
    export DB_URL = postgres://_your_db_info_
    ```

5. Run `npm start`
6. Go to `localhost:5000` for the home page
7. Start contributing to FAC-guidebook! :two_hearts:

  - For testing: run `npm test` (Database testing need additional credentials)

### User journey:

1. **User can view :eyes: existing posts**
    - Pull and display data from db

2. **Click to add :heavy_plus_sign: own post**
    - Check for cookie to see if user is logged in

3. **If not logged in :unlock: : Prompted to login or signup**
    - (If logged in, jump to step 6)

4. **User signs up** :lock_with_ink_pen:
    - Client side validation - check that password is at least 8 chars, with at least 1 numb, 1 uppercase and 1 lowercase
    - Server side - Check if user name already exists in the db
    - If no error, submit form to new row in USERS table with a HASHED password

5. **User logs in** :key:
    - Server side - check that username is present in db, then check that the hash of the input matches that user's hashed password.
    - If success, creates a JWT with info about specific user

6. **User can now access the post form (protected route)** :page_with_curl:

7. **User submits post form** :page_with_curl:
    - Client side - check that fields are not empty
    - Server side - check if the restaurant already exists/that a post hasn't already been made referencing it
    - If success, submit form to POSTS table and RESTAURANTS table

8. **User can view :eyes: updated home page!**



### What we worked on :clock130: : 

## Day :one: : 

- **Creating a new database on Heroku** and linking it to the new repo (this took longer than expected, we're still not sure why!)
- **Signup form validation** on the client side (unmatching passwords, patterns)
- We spent a long time **tracking our callback functions through different files** to figure out where to put the login form validation (to compare the password in the database with the password that is submitted)
- **whiteboard** coding

## Our process
![img_5081](https://user-images.githubusercontent.com/36998110/49939612-3d049600-fed5-11e8-8b82-a03d61225030.JPG)
![img_5082](https://user-images.githubusercontent.com/36998110/49939613-3d9d2c80-fed5-11e8-8032-57f2ed729284.JPG)
![img_5083](https://user-images.githubusercontent.com/36998110/49939614-3d9d2c80-fed5-11e8-9ea3-fb57c15ea165.JPG)
![img_5084](https://user-images.githubusercontent.com/36998110/49939615-3d9d2c80-fed5-11e8-9cf4-f06fd4e4d0a7.JPG)

## Day :two: : 

- **Updated our user journey**

![img_5101](https://user-images.githubusercontent.com/36998110/49939616-3d9d2c80-fed5-11e8-9223-f5a9ecff7e3a.JPG)

- Client-side validation for the sign up page

- Handling the USER LOGIN logic:

    - First step:

```js
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

  - Refactor with bcryptjs?

  - We created two promises. Here's one: 
  
  ```js
  const promiseSpecificUser = name => {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `SELECT * FROM users WHERE name = '${name}'`, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
        });
    });
  }
  ```

  - Signup form validation: 

- Client side - check that password is at least 8 chars, with at least 1 numb, 1 uppercase and 1 lowercase.
- Server side - Check is user name already exists in the db

## Login form validation:

  - Server side - check that username is present in db, then check that the hash of the input matches that user's hashed password!

  - Post form validation (everything we had in there last week...)
  
## Test for server side and database SEPERATELY! 


## Day :three: : 
- Add logout button & home button
- Add the required rules for the password validation
- Handle the length of the resturant review

