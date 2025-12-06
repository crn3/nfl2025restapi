var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
// 
var model = require('./model/db.js');  //

var app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



// routes here
// this is the middle man
// defines the route name
// '/players/' etc
// within each of these, it specifies the function in
// db.js that directly interacts with the database to get
// the info

// page 1 we need: 
// /venues
// /teams
// /players
// /players/KC
// /scores
// /scores/10

// get venues
app.route('/venues/')
.get(function (req, res) {
    model.getVenues(req, res);
})

// get teams
app.route('/teams/')
.get(function(req, res){
    model.getTeams(req, res);
})

// get players
app.route('/players/')
.get(function(req, res){
    model.getPlayers(req, res);
})

// get players by team abbreviation
app.route('/players/:team')
.get(function(req, res){
    model.getPlayersByTeam(req, res);
})

// get scores
app.route('/scores/')
.get(function(req, res){
    model.getScores(req, res);
})

//get scores by week
app.route('/scores/:week')
.get(function(req, res){
    model.getScoresByWeek(req, res);
})

var server = app.listen(3000, function() {
    console.log("Server listening on port 3000");
})