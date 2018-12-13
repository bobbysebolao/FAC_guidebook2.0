# FAC_guidebook2.0


### What we worked on: 

## Day 1: 

- Creating a database on Heroku and linking it to the new repo (this took longer than expected, we're still not sure why!)
- Signup form validation (unmatching passwords, patterns)
- 

## Day 2: 
- User journey

- Handling the USER SIGN UP logic:
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
Refactor with bcryptjs?
