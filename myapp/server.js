// var express = require("express");
// var app = express();
const moment = require("moment");
// app.use("/", express.static(__dirname + "/public"));
// var server = require("http").createServer(app);
var io_client = require("socket.io-client");
const utf8 = require("utf8");
// server.listen(3000);

//socket发送
let socket = io_client('http://localhost:3001');
socket.on("connect", function() {
  console.log("connect successful!");
  setInterval(() => {
    console.log("to send");
    let testmsg = {
      DT: moment().format("YYYYMMDDhhmmss"),
      MN: "LG.LJ.TEST1",
      AC: "10002",
      CC: "123456",
      CN: "2051",
      CP: { GCS004: "23.5", GCS005: "18", GGCS012: "5.6" }
    };
    let msg=utf8.encode(JSON.stringify(testmsg));
    socket.emit("message",msg);
  }, 5000);
});
