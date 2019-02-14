const fs = require("fs");
const leaderboardComments = require ("./leaderboardComments.json");

let userScore = {};
let threadScores = [];

function compare(a,b) {
  if (a.score > b.score)
    return -1;
  if (a.score < b.score)
    return 1;
  return 0;
}


for (i = 0; i < leaderboardComments.length; i++) {
  let author = leaderboardComments[i].author;
  let body = leaderboardComments[i].body;
  let score = parseInt(body.match(/(?<=score of )[0-9]{2,}/g,''));
  userScore[i] = {username: author, score: score};
  threadScores.push(userScore[i]);
  // console.log(userScore[i]);
}

console.log(threadScores.sort(compare));

fs.writeFile("./leaderboardScores.json", JSON.stringify(threadScores.sort(compare)))
