const app = require("./app.js");
const http = require("http");
const { intializeSocket } = require("./socket.js");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
intializeSocket(server);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
