const express = require('express'); ;
const cors = require('cors'); ;

const session = require('express-session');
const bodyParser = require('body-parser'); ;
const mongoose = require('mongoose'); 
const Game = require('./models/Game');
const Team = require('./models/Team');
const League = require('./models/League')
const passport = require('passport');
require('./passport')

const User = require('./models/User');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const generateSalt = require('./saltGenerator');



require('./db');

const app = express()
app.use(cors());

const PORT = process.env.PORT || 3000;


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
  console.log("authentication")
  console.log("user : " + req.isAuthenticated())
  console.log("req + " + req.role)
  //if (req.isAuthenticated()) {
    return next();
  //}
  res.redirect('/login'); 
};

const hasPermission = (requiredRole) => {
  console.log("permission")
  return (req, res, next) => {
    console.log(req.user.role)
    if (req.user && req.user.role === requiredRole) {
      return next();
    }
    res.status(403).send('Forbidden');
  };
};

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

app.post('/notification', async (req, res) => {
  console.log("notified")
  const data = JSON.stringify({
    "Messages": [{
      "From": { "Email": "owenchend@gmail.com", "Name": "owen" },
      "To": [{ "Email": req.body['email'], "Name": "User" }], 
      "Subject": "Event Reminder",
      "TextPart": `Reminder of the ${req.body['res']['type']}: ${req.body['res']['game']}. This event happens at ${req.body['res']['date'].substring(0, 10)} ${req.body['res']['date'].substring(11, 20)}`
    }]
  });
 
  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: { 'Content-Type': 'application/json' },
    auth: { username: '68df50c8a409c1990fe8d020fba91e26', password: '853f55b8267d3d01c5494b5f8531227b' },
  };
 
  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
 
});
app.get('/api/leagues', async (req, res) => {
  try {
      const leagues = await League.find({});
      res.json(leagues);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
})

app.get('/api/teams', async (req, res) => {
  try {
      const teams = await Team.find({});
      res.json(teams);
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

app.get('/api/:league/teams', async (req, res) => { // Returns all events with the same name as team
  try {
  console.log(req.params.league)
    try {
      console.log("i tried")
      const teams = await Team.find({ league: req.params.league });
      console.log(teams)
      res.json(teams);
    } catch (err) {
        console.log(err)
    }
  } catch (err) {
      console.log("this error")
      res.status(500).json({ error: err.message })
  }
})



app.post('/api/addgames',  /*isAuthenticated, hasPermission('admin'),*/ async (req, res) => {
    try {
        const game = new Game(req.body);
        console.log(game)
        try {
        await game.save();
        } catch (err) {
          console.log("Failed to save game: ")
          console.log(err)
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

app.post('/api/addleagues', /*isAuthenticated, hasPermission('admin'),*/ async (req, res) => {
  try {
      const league = new League(req.body);
      console.log(league)
      try {
      await league.save();
      } catch (err) {
        console.log("Failed to save league: ")
        console.log(err)
      }
      res.json(league);
  } catch (err) {
      res.status(500).json({error: err.message});
      console.log(err)
  }
})

app.post('/api/addteams',  /*isAuthenticated, hasPermission('admin'),*/ async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.json(team);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
})

app.delete('/api/:name/:league/deleteteams', async (req, res) => {
  const { name, league } = req.params;
  try {
      const result = await Team.findOneAndDelete({ name, league });
      res.status(200).json({ message: 'Team deleted successfully' });
      
  } catch (error) {
      console.log(err)
      res.status(500).json({error: err.message});
  }
});


app.delete('/api/deletegames/:id',  /*isAuthenticated, hasPermission('admin'),*/ async(req,res)=>{
  const gameId = req.params.id;
  console.log("ID to be deleted: " + gameId)
  try {  
      await Game.deleteOne({id : gameId})
      res.status(200).json({ message: 'Game Deleted' });
    
  } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message});
  }
})

app.delete('/api/:name/deleteleagues/',  /*isAuthenticated, hasPermission('admin'),*/ async(req,res)=>{
  const leagueName = req.params.name;
  console.log("League to be Deleted: " + leagueName)
  try {  
      await League.deleteOne({name : leagueName})
      res.status(200).json({ message: 'League Deleted' });
    
  } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message});
  }
})

app.get('/login', (req, res) => {
    res.send('This is the Login Page')
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