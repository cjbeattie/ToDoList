const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const Category = require('../models/category');

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
    Category.create(
        [
            { name: "Home", color: "red" },
            { name: "Work", color: "blue" },
            { name: "Shopping", color: "yellow" },
            { name: "Ideas", color: "green" },
            { name: "School", color: "purple" },
        ],
        (error, categories) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            }
            res.status(StatusCodes.OK).send({ message: "Seed successful" });
        }
    );
});

// CRUD (OR MORE LIKE RCUD!)

// READ ALL - find all categories
router.get("/", isAuthenticatedNormal, (req, res) => {
    Category.find({}, (error, categories) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(categories);
    });
});

// READ ONE - find one category
router.get("/:id", isAuthenticatedNormal, (req, res) => {
    Category.findById(req.params.id, (error, category) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(category);
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
            const locals = { category: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            // Data from form is valid.
            const category = req.body; // extract the data from POST
            Category.create(cateogory, (error, category) => {
                res.status(StatusCodes.CREATED).send(category);
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
            const locals = { category: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            Category.findByIdAndUpdate(
                req.params.id, // 1st arg - criteria => id
                req.body, // 2nd arg - what to update
                { new: true }, // 3rd arg - { new : true }
                (error, category) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                    }
                    res.status(StatusCodes.OK).send(category);
                }
            );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    Category.findByIdAndRemove(req.params.id, (error, category) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(category);
    });
});

module.exports = router;