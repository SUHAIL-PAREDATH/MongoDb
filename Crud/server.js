const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();



app.use(express.json())
app.set("view engine", "ejs") 
app.use(express.urlencoded({extended:false}))

// session
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true
}));
// Middleware to prevent caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// Middleware to check if the session is active
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.user = req.session.username; 
  } else {
    delete res.locals.user;
  }
  next();
});


app.use('/css',express.static(path.resolve(__dirname, "assets/css")));
app.use('/js',express.static(path.resolve(__dirname, "assets/js")));

// add_user

app.use('/',require('./server/router/router'))

app.listen(3000,() => {
    console.log("Server is running on http://localhost:3000");
});