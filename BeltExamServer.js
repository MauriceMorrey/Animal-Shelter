var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");
var flash = require("express-flash");

app.use(express.static(path.join(__dirname, "/public/dist/public")));
app.use(express.static(path.join(__dirname, "./client/static")));
app.set("views", path.join(__dirname, "./client/Views"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "couldbeanything",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.use(flash());

require("./server/config/connection.js");
require("./server/config/routes.js")(app);



app.listen(8000, function() {
  console.log("listening on port 8000");
});
