console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
    url: process.env.MONGO_URL,
    collection: "sessions",
});

// 1 Kirish codlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 Session codlari
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 30, // for 30 minutes
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
);

// 3 Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
// app.use("/resto", router_bssr); //traditional usul
app.use("/", router);            // react usul

module.exports = app;
