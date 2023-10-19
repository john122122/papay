console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

// 1 Kirish codlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3 Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.use("/resto", router_bssr); //traditional usul
app.use("/", router);            // react usul

module.exports = app;
