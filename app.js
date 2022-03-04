//後端伺服器 (express + socket設定)
const express = require("express");
const app = express();
const server = require("http").createServer(app);  
const buildSocket = require('./server')
buildSocket(server)

server.listen(3000);