const express = require('express'); ;
const cors = require('cors'); ;
const session = require('express-session');
const bodyParser = require('body-parser'); ;
const mongoose = require('mongoose'); 
const Game = require('./models/Game');
const Team = require('./models/Team');
const passport = require('passport');
require('./passport')

const User = require('./models/User');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const generateSalt = require('./saltGenerator');


require('./db');

const app = express()
const PORT = process.env.PORN || 3000;


// Middleware setup
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: `${generateSalt()}`, 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); 
};

const hasPermission = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      return next();
    }
    res.status(403).send('Forbidden');
  };
};

app.use(cors());
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT) 
});

app.get('/', (req, res) => {
    res.send('Welcome to the application!');
  });

app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find({});
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/api/games/:id', async (req, res) => { // Returns a game by ID
  console.log(req.params.id);
  try {
      const gameId = parseInt(req.params.id);
      const game = await Game.findOne({id: gameId});
      res.json(game);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.get('/api/:teamname/games', async (req, res) => { // Returns all events with the same name as team
    try {
      const games = await Game.find({ name: req.params.teamname });
      res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



app.post('/api/addgames', isAuthenticated, hasPermission('admin'), async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.json(game);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

app.post('/api/addteams', /*isAuthenticated, hasPermission('admin'),*/ async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.json(team);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
})

app.get('/login', (req, res) => {
    res.send('This is the Logiiiiin Page')
  });
  
  app.get('/dashboard', (req, res) => {
    res.send('Welcome to the dashboard!');
  });
  
  app.get('/logoutConfirmed', (req, res) => {
    res.send('You have logged out!');
  });
  
  app.get('/admin', isAuthenticated, hasPermission('admin'), (req, res) => {
    res.send('Welcome to the admin dashboard!');
  });