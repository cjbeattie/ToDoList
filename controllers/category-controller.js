const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Animal = require('../models/animals');

const router = express.Router();

// Authentication check middleware
// NORMAL
const isAuthenticatedNormal = (req, res, next) => {
    return next();
    // if (req.session && req.session.currentUser) {
    //     return next();
    // } else {
    //     res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    // }
};
// ADMIN
const isAuthenticatedAdmin = (req, res, next) => {
    return next();
    // if (req.session && req.session.currentUser && req.session.currentUser.isAdmin === true) {
    //     return next();
    // } else {
    //     res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    // }
};

// Seed database
router.get("/seed", isAuthenticatedAdmin, (req, res) => {
    Animal.create(
        [
            { name: "Mittens", DOB: new Date("2020-01-01"), gender: "Female", family: "Smith", status: "Abandoned" },
            { name: "Buddy", DOB: new Date("2019-03-08"), gender: "Male", family: "Jones", status: "Abandoned" },
            { name: "Nala", DOB: new Date("2019-08-05"), gender: "Female", family: "Lau", status: "Abandoned" },
            { name: "Teddy", DOB: new Date("2019-06-24"), gender: "Male", family: "Rogers", status: "Abandoned" },
        ],
        (error, animals) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            }
            res.status(StatusCodes.OK).send({ message: "Seed successful" });
        }
    );
});

// CRUD (OR MORE LIKE RCUD!)

// READ ALL - find all animals
router.get("/", isAuthenticatedNormal, (req, res) => {
    Animal.find({}, (error, animals) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(animals);
    });
});

// READ ONE - find one animal
router.get("/:id", isAuthenticatedNormal, (req, res) => {
    Animal.findById(req.params.id, (error, animal) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(animal);
    });
});

// CREATE
router.post(
    "/",
    isAuthenticatedAdmin,
    body("name", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { animal: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            // Data from form is valid.
            const animal = req.body; // extract the data from POST
            Animal.create(animal, (error, animal) => {
                res.status(StatusCodes.CREATED).send(animal);
            });
        }
    }
);

// UPDATE
router.put(
    "/:id",
    isAuthenticatedAdmin,
    body("name", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { animal: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            Animal.findByIdAndUpdate(
                req.params.id, // 1st arg - criteria => id
                req.body, // 2nd arg - what to update
                { new: true }, // 3rd arg - { new : true }
                (error, animal) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                    }
                    res.status(StatusCodes.OK).send(animal);
                }
            );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    Animal.findByIdAndRemove(req.params.id, (error, animal) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(animal);
    });
});

module.exports = router;