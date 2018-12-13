# FAC_guidebook2.0


### What we worked on: 

## Day 1: 

- Creating a database on Heroku and linking it to the new repo (this took longer than expected, we're still not sure why!)
- Signup form validation (unmatching passwords, patterns)
- whiteboard coding

![img_5081](https://user-images.githubusercontent.com/36998110/49939612-3d049600-fed5-11e8-8b82-a03d61225030.JPG)
![img_5082](https://user-images.githubusercontent.com/36998110/49939613-3d9d2c80-fed5-11e8-8032-57f2ed729284.JPG)
![img_5083](https://user-images.githubusercontent.com/36998110/49939614-3d9d2c80-fed5-11e8-9ea3-fb57c15ea165.JPG)
![img_5084](https://user-images.githubusercontent.com/36998110/49939615-3d9d2c80-fed5-11e8-9cf4-f06fd4e4d0a7.JPG)

## Day 2: 
- User journey
![img_5101](https://user-images.githubusercontent.com/36998110/49939616-3d9d2c80-fed5-11e8-9223-f5a9ecff7e3a.JPG)

- Clinet-side validation for the sign up page

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
- Refactor with bcryptjs?
