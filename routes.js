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
router.get("/questions/:qID", function(req, res){
    res.json({
        response: "You sent me a GET request for qID " + req.params.qID
    });
});

/**
 * POST /questions/:id/answers
 * 
 * Route for creating an answer
 */
router.post("/questions/:qID/answers", function(req, res){
    res.json({
        response: "You sent me a POST request to /answers",
        questionID: req.params.qID,
        body: req.body
    });
});

/**
 * PUT /questions/:qID/answers/:aID
 * 
 * Edit a specific answer
 */
router.put("/questions/:qID/answers/:aID", function(req, res){
    res.json({
        response: "You sent me a PUT request to /answers",
        questionID: req.params.qID,
        answerID: req.params.aID,
        body: req.body
    });
});

/**
 * DELETE /questions/:qID/answers/:aID
 * 
 * Delete a specific answer
 */
router.delete("/questions/:qID/answers/:aID", function(req, res){
    res.json({
        response: "You sent me a DELETE request to /answers",
        questionID: req.params.qID,
        answerID: req.params.aID
    });
});

/**
 * POST /questions/:qID/answers/:aID/vote-up
 * POST /questions/:qID/answers/:aID/vote-down
 * 
 * Vote on a specific answer
 * 
 * NOTE: ^(value1|value2)$ searches for only the strings with nothing before the first letter and nothing after the last letter
 */
router.post("/questions/:qID/answers/:aID/vote-:dir", function(req, res, next) {
        if (req.params.dir.search(/^(up|down)$/) === -1) {
            var err = new Error("Not found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    },function(req, res){
    res.json({
        response: "You sent me a POST request to /vote-" + req.params.dir,
        questionID: req.params.qID,
        answerID: req.params.aID,
        vote: req.params.dir
    });
});

module.exports = router;