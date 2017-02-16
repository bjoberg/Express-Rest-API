'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

/**
 * Catch errors and log them to the console
 */
db.on("error", function(err) {
    console.error("conneciotn error:", err);
});


/**
 * When the db is opened successfully, run db commands
 */
db.once("open", function() {
    console.log("db conneciton successful");

    // All database communication goes here

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: {type: String, default: "Goldfish"},
        color: {type: String, default: "Small"},
        size: {type: String, default: "Golden"},
        mass: {type: Number, default: 0.007},
        name: {type: String, default: "Angela"}
    });

    var Animal = mongoose.model("Animal", AnimalSchema);

    var animal = new Animal({});

    var elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrence"
    });

    Animal.remove({}, function(err){
            if (err) {
                console.error("Removal failed", err);
            } else {
                console.log("All data removed!")
            }
        elephant.save(function(err) {
            if (err) {
                console.error("Save failed", err);
            } else {
                console.log("Saved elephant!")
            }
            animal.save(function() {
                if (err) {
                    console.error("Save failed", err);
                } else {
                    console.log("Saved animal!")
                }
                db.close(function() {
                    console.log("db connection closed.");
                });
            });
        });
    });
});