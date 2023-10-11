const http =require("http");
const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://abbosusman2020:wRWhp75AqOhhq9ou@cluster0.aed8vp8.mongodb.net/Reja2";

mongodb.connect(
      connectionString,
  {
    useNewurlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection succeed");
        module.exports = client;

        const app = require("./app");
        const server = http.createServer(app);
        let PORT = 3003;
        server.listen(PORT, function () {
            console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
            );
        });
    }
  }
);