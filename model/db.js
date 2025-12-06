var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nfl2025",
  timezone: "utc+0",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Successfully connected to nfl2025`);
});

//get venues
exports.getVenues = function (req, res) {
  connection.query(`SELECT * FROM venues`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// get teams
exports.getTeams = function (req, res) {
  connection.query(`SELECT * FROM teams`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// get players
exports.getPlayers = function (req, res) {
  connection.query(`SELECT * FROM players`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// // get players by team abv
exports.getPlayersByTeam = function (req, res) {
  let team = req.params.team;
  connection.query(
    `SELECT p.*, t.teamAbbreviation, t.teamDisplayName 
        FROM players p
        JOIN teams t
        ON p.teamid = t.teamID
        WHERE t.teamAbbreviation = ?`,
    [team],
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// get scores
exports.getScores = function (req, res) {
  connection.query(`SELECT * FROM scoreboard`, function (err, rows, fields) {
    if (err) throw err;
    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// get scores by week
exports.getScoresByWeek = function (req, res) {
  let week = req.params.week;
  connection.query(
    `SELECT * FROM scoreboard
    WHERE weekNumber = ?`,
    [week],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};
