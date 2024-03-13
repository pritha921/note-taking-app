const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const User = require('./models/usermodel');

const app = express();
const port = 3000;

mongoose
  .connect('mongodb+srv://prithasen006:Mymongo07@todoapi.cufbbh8.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected to MongoDB")
  }).catch(() => {
    console.log("Error")
  })
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/login', (req, res) => {
  res.render('pages/login', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', (req, res) => {
  res.render('pages/register', { message: req.flash('error') });
});

app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log("Prints here",email, password, username)
    const user = await User.create({ email, password,username });
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', err.message);
    console.log(err);
    res.redirect('/register');
  }
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})

// const express = require('express');
// const session = require('express-session');
// const passport = require('./config/passport');
// const flash = require('connect-flash');
// const mongoose = require('mongoose');
// const User = require('./models/usermodel');

// const app = express();
// const port = 3000;

// mongoose
//   .connect('mongodb+srv://prithasen006:Mymongo07@todoapi.cufbbh8.mongodb.net/node-api?retryWrites=true&w=majority')
//   .then(() => {
//     console.log("Connected to MongoDB")
//   }).catch(() => {
//     console.log("Error")
//   })
// app.use(express.json())
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// // Home route
// app.get('/', (req, res) => {
//   res.render('pages/home');
// });

// // Login route
// app.get('/login', (req, res) => {
//   res.render('pages/login', { message: req.flash('error') });
// });

// // Login post route
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// // Dashboard route
// app.get('/dashboard', (req, res) => {
//   if (req.isAuthenticated()) {
//     // User is logged in, redirect to their specific home page
//     res.redirect(`/users/${req.user.username}`);
//   } else {
//     // User is not logged in, display error message
//     req.flash('error', 'You are not a registered user.');
//     res.redirect('/login');
//   }
// });

// // Logout route
// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`App listening at port ${port}`)
// });


