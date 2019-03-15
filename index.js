const express = require('express')
const app = express()
const cors = require('cors');
var floor_one = require('./floor_one');
var floor_two = require('./floor_two');



bodyParser = require('body-parser');

app.use(bodyParser.json());

var floor_one_rooms = {
  12345: "pineapple",
  6789: "cake",
  2763145: "biscuit",
  217814684: "cupcake",
  1233: "cookie",
  12122: "pasta"
}

var floor_two_rooms = {
  1357: "pizza",
  2468: "rice",
  3579: "curry"
}

var floors = {

  1: floor_one,
  2: floor_two
}


var urlencodedParser = bodyParser.urlencoded({extended: false});
const port = 3000

app.get('/room/:roomId', (req, res) => res.send('You requested for a room!'));

app.get('/rooms/:floorId', (req, res) => {
  const floorid = req.params.floorId;

  res.json(floors[floorid]);
});


app.post('/event', urlencodedParser, (req, res) => {

var name = floor_one_rooms[req.body.roomId];


res.send('Your room name: ' +
floor_one_rooms[req.body.roomId] + '\nYour start time: ' + req.body.startTime + '\nYour time duration: '
+ req.body.time + '\nYour floor busy schedule: ' + floor_one[name].busy)});





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
