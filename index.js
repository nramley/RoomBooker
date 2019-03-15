const express = require('express')
const app = express()
const cors = require('cors');
let floor_one = require('./floor_one');


bodyParser = require('body-parser');

app.use(bodyParser.json());

var floor_one_rooms = {
  12345: "Cheesecake",
  6789: "Potato"
}


var urlencodedParser = bodyParser.urlencoded({extended: false});
const port = 3000

app.get('/room/:roomId', (req, res) => res.send('You requested for a room!'));

app.get('/rooms/:floorId', (req, res) => res.json(floor_one));

app.post('/event', urlencodedParser, (req, res) => res.send('Your room name: ' + floor_one_rooms[req.body.roomId] + '\nYour start time: ' + req.body.startTime + '\nYour time duration: ' + req.body.time));





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
