"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server_1 = require("./server");
var port = process.env.port || 3000;
var mainServer = http.createServer(server_1.default);
mainServer.listen(port, function () {
    console.log("Server is connected on " + port);
});
//# sourceMappingURL=index.js.map