var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
//
var model = require("./model/db.js"); //

var app = express();
app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get venues
app.route("/venues/").get(function (req, res) {
  model.getVenues(req, res);
});

// get teams
app.route("/teams/").get(function (req, res) {
  model.getTeams(req, res);
});

// get players
app.route("/players/").get(function (req, res) {
  model.getPlayers(req, res);
});

// get players by team abbreviation
app.route("/players/:team").get(function (req, res) {
  model.getPlayersByTeam(req, res);
});

// get player by id
app.route("/player/:id").get(function (req, res) {
  model.getPlayerById(req, res);
});

// get players with team name
app.route("/playersTeamNames").get(function (req, res) {
  model.getPlayersTeamNames(req, res);
});

// get scores
app.route("/scores/").get(function (req, res) {
  model.getScores(req, res);
});

//get scores by week
app.route("/scores/:week").get(function (req, res) {
  model.getScoresByWeek(req, res);
});

// get week data
app.route("/weeks").get(function (req, res) {
  model.getWeeks(req, res);
});

var server = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
