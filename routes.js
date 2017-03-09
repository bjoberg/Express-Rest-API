'use strict';

var express = require("express");
var router = express.Router();
var Question = require("./models").Question;

// Handle qID everytime it is present
router.param("qID", function(req, res, next, id){
    Question.findById(id, function(err, doc){
        // 1. Handle any errors
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }

        // 2. No errors
        req.question = doc;
        return next();
    });
});

// Handle aID everytim it is present
router.param("aID", function(req, res, next, id){
    req.answer = req.question.answer.id(id);

    // 1. Handle any errors
    if(!req.answer) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
    }

    // 2. No errors
    next();
});

/**
 * GET /questions/
 * 
 * Route for getting questions collection
 */
router.get("/questions/", function(req, res, next){
    // Documents will be sorted in descending order because of -1
    Question.find({})
        .sort({createdAt: -1})
        .exec(function(err, questions){
            // 1. Handle any errors
            if(err) return next(err);

            // 2. No errors
            res.json(questions);
        });
});

/**
 * POST /questions/
 * 
 * Route for creating questions
 */
router.post("/questions/", function(req, res, next){
    var question = new Question(req.body);
    question.save(function(err, question){
        // 1. Handle any errors
        if(err) return next(err);

        // 2. No errors
        res.status(201);
        res.json(question);
    });
});

/**
 * GET /questions/:id
 * 
 * Route for getting a specific question
 */
router.get("/questions/:qID", function(req, res, next){
    // Only send the doc because the 'params' handler has everything else covered.
    res.json(doc);
});

/**
 * POST /questions/:id/answers
 * 
 * Route for creating an answer
 */
router.post("/questions/:qID/answers", function(req, res, next){
    req.question.answers.push(req.body);
    req.question.save(function(err, question){
        // 1. Handle any errors
        if(err) return next(err);

        // 2. No errors
        res.status(201);    // Resource was successfully created
        res.json(question);
    });
});

/**
 * PUT /questions/:qID/answers/:aID
 * 
 * Edit a specific answer
 */
router.put("/questions/:qID/answers/:aID", function(req, res){
    req.answer.update(req.body, function(err, result){
        // 1. Handle any errors
        if(err) return next(err);

        // 2. No errors
        res.json(result);
    });
});

/**
 * DELETE /questions/:qID/answers/:aID
 * 
 * Delete a specific answer
 */
router.delete("/questions/:qID/answers/:aID", function(req, res){
    req.answer.remove(function(err){
        req.question.save(function(err, question){
            // 1. Handle errors
            if(err) return next(err);

            // 2. No errors
            res.json(question);
        });
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
            req.vote = req.params.dir;
            next();
        }
    },function(req, res){
        req.answer.vote(req.vote, function(err, question){
                // 1. Handle errors
                if(err) return next(err);

                // 2. No errors
               res.json(question);
        });
});

module.exports = router;