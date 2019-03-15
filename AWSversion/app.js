const express = require('express')
const app = express()
const cors = require('cors');
var floor_one = require('./floor_one');
var floor_two = require('./floor_two');

var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');


    bodyParser = require('body-parser');
    app.use(bodyParser.json());
    
    var urlencodedParser = bodyParser.urlencoded({extended: false});
    
    var floors = {
      1: floor_one,
      2: floor_two
    }
    
    
    // app.get('/floors/:floorId/:roomId', (req, res) => {
    //   let floor = floors[req.params.floorId];
    
    //   let room = floor.filter(room => {
    //     return room.id == req.params.roomId;
    //   })[0];
    
    //   res.json(room);
    // }
    // );
    
    app.get('/floors/:floorId', (req, res) => {
      console.log('Get Request received for floor ${req.params.floorId} ')
      const floorid = req.params.floorId;
    
      res.json(floors[floorid]);
    });
    
    
    app.put('/event/:floorId/:roomName', urlencodedParser, (req, res) => {
        console.log('Put Request received for floor ' + req.params.floorId + ' and room ' +  req.params.roomName)

        let floor = floors[req.params.floorId];
        
        let room = floor.filter(room => {
            return room.name == req.params.roomName;
        })[0];
        
        const index = floor.indexOf(room);
        
        if (!room.busy) {
            room.busy = true;
            res.status(200);
            res.send('Your room has been booked.');
        } else {
            room.busy = false;
            res.status(400);
            res.send('Sorry, this room is busy during that timeslot');
        }
        
        floors[req.params.floorId][index] = room;
    });
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
