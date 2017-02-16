'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json; 
var logger = require("morgan");

/**
 * This will configure the middleware to give use status codes for our API reponses
 * 
 * https://www.npmjs.com/package/morgan
 */
app.use(logger("dev"));

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
 * Tip: You can mount your routes to have a specific base route: `app.use("/[base-route]", routes)`. Just don't forget to configure your routes in routes.js to reflect this base route.
 */
app.use(routes)

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Express server is listening on port:", port);
});