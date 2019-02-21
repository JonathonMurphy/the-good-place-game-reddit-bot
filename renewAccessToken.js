  const fs = require("fs");
  const http = require("https");
  const tokens = require("./authorization/tokens.json");
  const querystring = require("querystring");

  let postData = querystring.stringify({
    // grant_type: "authorization_code",
    grant_type: "refresh_token",
    refresh_token: tokens.refresh_token,
    code: "8LLlEWleQePRn83TUUB2GUvlB0Y",
    redirect_uri: "http://localhost:8080",
  });

  let options = {
    "method": "POST",
    "hostname": "www.reddit.com",
    "port": null,
    "path": "/api/v1/access_token",
    "headers": {
      //Base 64 Encoded client_id and client_secret seperated by a :
      "Authorization": "Basic dk90eDlrU0J1T3htb2c6ajR3VXlnV1R3dzVSNWE3dmROV1Q5TjNhVDkw",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "Content-Length": postData.length
    }
  };

  let req = http.request(options, function (res) {
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      let body = JSON.parse(Buffer.concat(chunks).toString());
      // update the element of tokens with new access_token
      tokens.access_token = body.access_token;
      fs.writeFile("./authorization/tokens.json", JSON.stringify(tokens, null, 2), function (err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(tokens));
        console.log('writing to ' + "./authorization/tokens.json");
      });
    });
  });

  req.write(postData);
  req.end();
