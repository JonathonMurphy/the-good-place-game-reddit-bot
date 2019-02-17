const http = require("https");
const fs = require("fs");
const oauth = require("./authorization/oauth.js")
const tokens = require("./authorization/tokens.json");

let options = {
  "method": "GET",
  "hostname": "oauth.reddit.com",
  "port": 443,
  "path": "/r/thegoodplacegame/comments/anrpak",
  "headers": {
    "Authorization": tokens.token_type + " " + tokens.access_token,
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Macintosh:8vQ4GEUszqZaCQ:v0.1.1 (by /u/thebeatmakingbeard)",
    "Accept": "application/json"
  }
};

http.get(options, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    let threadDataCompleted = [];
    for (i = 0; i < JSON.parse(data).length; i++) {
      let threadDataTemp = JSON.parse(data)[1].data.children[i].data;
      threadDataCompleted.push(threadDataTemp);
      console.log(threadDataTemp + 'End of Part ' + i);
    }
    console.log(threadDataCompleted + ' Completed JSON');
    fs.writeFile("./json/leaderboardComments.json", JSON.stringify(threadDataCompleted));
  });
}).on("error", (err) => {
  console.log("Error: " + err);
});
