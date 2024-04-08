// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const cors = require('cors');
router.use(cors());



// POST request to handle login form submission
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res.redirect('/login'); // Redirect to login page
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard'); // Redirect to dashboard on successful login
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      // Handle error
      return res.status(500).send('Internal Server Error');
    }
  })
  res.redirect('/logoutConfirmed');
});

// router.post('/register'...)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
  

module.exports = router;
