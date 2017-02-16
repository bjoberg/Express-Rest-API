'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json; 

/**
 * When any request is received parse it as json
 * 
 * Note: this runs every request
 */
app.use(jsonParser());

/**
 * When any request is received look through the routes
 * 
 * Note: this runs every request
 */
app.use(routes);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Express server is listening on port:", port);
});