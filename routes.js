'use strict';

var express = require("express");
var router = express.Router();

/**
 * GET /questions/
 * 
 * Route for getting questions collection
 */
router.get("/questions/", function(req, res){
    res.json({
        response: "You sent me a GET request"
    });
});

/**
 * POST /questions/
 * 
 * Route for creating questions
 */
router.post("/questions/", function(req, res){
    res.json({
        response: "You sent me a POST request",
        body: req.body
    });
});

/**
 * GET /questions/:id
 * 
 * Route for getting a specific question
 */
router.get("/questions/:id", function(req, res){
    res.json({
        response: "You sent me a GET request for ID " + req.params.id
    });
});

module.exports = router;