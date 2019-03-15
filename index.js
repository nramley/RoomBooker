const express = require('express')
const app = express()
const cors = require('cors');
var floor_one = require('./floor_one');
var floor_two = require('./floor_two');

const port = 3000

bodyParser = require('body-parser');
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({extended: false});

var floors = {
  1: floor_one,
  2: floor_two
}


app.get('/floors/:floorId/:roomId', (req, res) => {
  let floor = floors[req.params.floorId];

  let room = floor.filter(room => {
    return room.id == req.params.roomId;
  })[0];

  res.json(room);
}
);

app.get('/floors/:floorId', (req, res) => {
  const floorid = req.params.floorId;

  res.json(floors[floorid]);
});


app.put('/event/:floorId/:roomId', urlencodedParser, (req, res) => {

let floor = floors[req.params.floorId];

let room = floor.filter(room => {
  return room.id == req.params.roomId;
})[0];

const index = floor.indexOf(room);


if (!room.busy) {
  room.busy = true;
} else {
  res.status(400);
  res.send('Sorry, this room is busy during that timeslot');
  return;
}

floors[req.params.floorId][index] = room;

res.status(200);
res.send('Your room has been booked.');

});





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
