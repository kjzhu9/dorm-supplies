//dorm supplies
//boiler plate copied from day 2 afternoon

const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config')
const User = require('/models/schemas/user')

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 } } })

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.post('/users/', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  const userData = {
    email: req.body.email,
    hash: req.body.password,
    name: req.body.name
  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return res.status(500).send('Could not create')
    return res.json(newUser)
  })
})

app.get('/users/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send('Error: ' + err)
    return res.json(users)
  })
})

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!')
});

//FROM DAY 2 AFTERNOON!!!
// clients should be able to create new users, get all users, get a single user,
// update a user, and delete a user
app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.get('/users', (req, res, next) => res.json(users));
app.get('/users/:id', (req, res, next) => {
    const user = users.filter(user => user.id === req.params.id)
    if (user.length !== 1) return res.status(404).send('No user with that ID');
    return res.json(user)
});

app.post('/users', (req, res, next) => {
    if (typeof req.body.name !== 'string')
        return res.status(400).send('Missing name');
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string')
        return res.status(400).send('Missing password');

    const newUser = {
        id: genId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    return res.sendStatus(200);
});

app.put('/users/:id', (req, res, next) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            users[i].name = req.body.name || users[i].name;
            users[i].email= req.body.email || users[i].email;
            users[i].password = req.body.password || users[i].password;
            return res.sendStatus(200);
        }
    }
    return res.status(404).send('No user with that ID');
});

app.delete('/users/:id', (req, res, next) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            users.splice(i, 1);
            return res.sendStatus(200);
        }
    }
    return res.status(404).send('No user with that ID');
});


const server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;