console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

// MongDB chaqirish
const db = require("./server").db();
const mongodb = require("mongodb");

// MongoDB connect

// 1 Kirish codlari
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2 Session codlari

//3 Views codelari
app.set("views", "views");
app.set("view engine", "ejs");

//4 Routing code

module.exports = app;