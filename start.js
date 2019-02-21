const renewAccessToken = require("./renewAccessToken.js");

setTimeout(function() {
  const getThreadContents = require("./getThreadContents.js");
}, 500)

setTimeout(function() {
  const pullScores = require("./pullScores.js");
}, 1000)

setTimeout(function() {
  const buildComment = require("./buildComment.js");
}, 1500)

setTimeout(function() {
  const editComment = require("./editComment.js");
}, 2000)
