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

// get players by team abv
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

// get player by id
exports.getPlayerById = function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM players WHERE id = ?`,
    [id],
    function (err, rows, fields) {
      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// get players with team names
exports.getPlayersTeamNames = function (req, res) {
  connection.query(
    `SELECT p.*, t.teamDisplayName 
        FROM players p
        JOIN teams t
        ON p.teamid = t.teamID`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// get scores
// have to cast bit columns as ints
// prevents node returning it as a buffer
exports.getScores = function (req, res) {
  connection.query(
    `
  SELECT 
  *,
  CAST(team1Qtr1ScorePeriod AS UNSIGNED) AS team1Qtr1ScorePeriod,
  CAST(team1Qtr2ScorePeriod AS UNSIGNED) AS team1Qtr2ScorePeriod,
  CAST(team2Qtr1ScorePeriod AS UNSIGNED) AS team2Qtr1ScorePeriod,
  CAST(team2Qtr2ScorePeriod AS UNSIGNED) AS team2Qtr2ScorePeriod
FROM scoreboard
`,
    function (err, rows) {
      if (err) throw err;
      res.status(200).send(rows);
    }
  );
};

// get scores by week
exports.getScoresByWeek = function (req, res) {
  let week = req.params.week;
  connection.query(
    `SELECT 
  *,
  CAST(team1Qtr1ScorePeriod AS UNSIGNED) AS team1Qtr1ScorePeriod,
  CAST(team1Qtr2ScorePeriod AS UNSIGNED) AS team1Qtr2ScorePeriod,
  CAST(team2Qtr1ScorePeriod AS UNSIGNED) AS team2Qtr1ScorePeriod,
  CAST(team2Qtr2ScorePeriod AS UNSIGNED) AS team2Qtr2ScorePeriod
FROM scoreboard
    WHERE weekNumber = ?`,
    [week],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// get weeks 
exports.getWeeks = function (req, res) {
  connection.query(`SELECT * FROM weeks`, function (err, rows, fields) {
    if (err) throw err;
    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// get a game by id
exports.getGame = function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT *, CAST(team1Qtr1ScorePeriod AS UNSIGNED) AS team1Qtr1ScorePeriod,
  CAST(team1Qtr2ScorePeriod AS UNSIGNED) AS team1Qtr2ScorePeriod,
  CAST(team2Qtr1ScorePeriod AS UNSIGNED) AS team2Qtr1ScorePeriod,
  CAST(team2Qtr2ScorePeriod AS UNSIGNED) AS team2Qtr2ScorePeriod
FROM scoreboard
    WHERE id = ?`,
    [id],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// get user login details
exports.getUsers = function(req,res){
  connection.query(`SELECT * FROM users`, function(err, rows, fields){
    if (err) throw err;
    res.status(200);
    res.send(JSON.stringify(rows));
  })
}

// post changes to game scores
exports.updateGameScore = function(req, res) {
  
  let id = req.params.id;
  console.log("IN RESTAPI HEHE" + id);
  const {
    team1Qtr1Score,
    team1Qtr2Score,
    team1Qtr3Score,
    team1Qtr4Score,
    team2Qtr1Score,
    team2Qtr2Score,
    team2Qtr3Score,
    team2Qtr4Score,
    team1Score,
    team2Score
  } = req.body;

  connection.query(
    `UPDATE scoreboard SET 
    team1Qtr1Score = ?,
    team1Qtr2Score = ?,
    team1Qtr3Score = ?,
    team1Qtr4Score = ?,
    team2Qtr1Score = ?,
    team2Qtr2Score = ?,
    team2Qtr3Score = ?,
    team2Qtr4Score = ?,
    team1Score = ?,
    team2Score = ?
    WHERE id = ?`,
    [
      team1Qtr1Score,
      team1Qtr2Score,
      team1Qtr3Score, 
      team1Qtr4Score,
      team2Qtr1Score,
      team2Qtr2Score,
      team2Qtr3Score,
      team2Qtr4Score,
      team1Score,
      team2Score,
      id
    ],
    function(err, result){
      if(err) {
          console.error(err);
          return res.status(500).send("Error updating scores");
        }
        res.send({
          message: "Scores updated",
          affectedRows: result.affectedRows
        });
    }

  );
};