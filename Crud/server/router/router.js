const express = require('express');
// const axios = require('axios')
const route = express.Router();
const controller = require('../controller/controller');
const collection = require('../../database/mongodb')




route.get("/", (req, res) => {
    // res.render("login")
    if (req.session.userId) {
      return res.redirect("/api/users"); // Redirect to the user's account page if already logged in
    }
    res.render("login")
})


route.get("/add-user",(req, res) => {
    res.render("add_user")
})



// getting signup detailes to database 
route.get("/signup", (req, res) => {

    res.render("signup", { message: "" });
})

route.get("/login", (req, res) => {
    res.render("login", {message: ""});
  });

route.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
      }
      res.redirect('/login');
    });
});



// api
route.post('/api/users',controller.sessionChecker, controller.create);
route.get('/api/users',controller.sessionChecker, controller.find);
route.post('/login', controller.loginUser);
route.post('/signup', controller.signUpUser); 
route.put('/api/users/:id',controller.sessionChecker, controller.update);
route.delete('/api/users/:id',controller.sessionChecker, controller.delete);
route.get('/update-user',controller.showUpdateDetails)


module.exports = route;