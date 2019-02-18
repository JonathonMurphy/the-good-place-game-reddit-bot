const http = require("https");
const fs = require("fs");
const oauth = require("./authorization/oauth.js")
const tokens = require("./authorization/tokens.json");
const querystring = require("querystring");
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const comment = require("./comment.txt");

let postData = querystring.stringify({
  ad: false,
  api_type: "",
  app: "",
  extension: "",
  flair_id: "",
  flair_text: "",
  kind: "self",
  nsfw: false,
  resubmit: false,
  richtext_json: "",
  sendreplies: false,
  spoiler: false,
  sr: "thegoodplacegame",
  text: comment, //comment.txt
  title: "Current Leaderboard Rankings",
  uh: "",
  url: "r/thegoodplacegame/",
  video_poster_url: ""
})

let options = {
  "method": "POST",
  "hostname": "oauth.reddit.com",
  "port": 443,
  "path": "/api/submit/",
  "headers": {
    "Authorization": tokens.token_type + " " + tokens.access_token,
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Macintosh:8vQ4GEUszqZaCQ:v0.1.1 (by /u/thebeatmakingbeard)",
    "Accept": "application/json"
  }
};

let req = http.request(options, function (res) {
  let chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    let body = JSON.parse(Buffer.concat(chunks).toString());
    console.log(body);
  });
});

req.write(postData);
req.end();
