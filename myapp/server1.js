var net = require("net");
const utf8 = require("utf8");
const moment = require("moment");
var port = 9002;
var host = "180.141.91.135";
var client = new net.Socket();
//创建socket客户端
client.setEncoding("binary");
//连接到服务端
client.connect(
  port,
  host,
  function() {
    setTimeout(() => {
        
      let testmsg = {
        DT: moment().format("YYYYMMDDhhmmss"),
        MN: "LG.LJ.TEST1",
        AC: "10002",
        CC: "123456",
        CN: "2051",
        CP: { WKKX002:"112"}
      };
      let msg = utf8.encode(JSON.stringify(testmsg)+"\r\n");
    //   console.log(msg);
      client.write(msg);
      //向端口写入数据到达服务端
    }, 10000);
  }
);
client.on("data", function(data) {
  console.log("from server:" + data);
  //得到服务端返回来的数据
});
client.on("error", function(error) {
  //错误出现之后关闭连接
  console.log("error:" + error);
  client.destory();
});
client.on("close", function() {
  //正常关闭连接
  console.log("Connection closed");
});
