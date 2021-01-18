const express = require('express');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const List = require('../models/list');


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

    // let HomeID = List.find({ "name": { $eq: "Home" } }, (err, active) => {
    //     console.log(active);
    //     res.send(active);
    // }

    List.create(
        [
            {
                // 1. Seed category first http://localhost:4000/category/seed
                // 2. Copy your local category IDs into the correct places below
                // 3. Seed these lists http://localhost:4000/list/seed
                category: "6005572ac65809d17fce3e41",
                tasks: [{
                    description: "Fix window",
                    isCompleted: false,
                },
                {
                    description: "Sweep floors",
                    isCompleted: false,
                }]
            },
            {
                category: "6005572ac65809d17fce3e42",
                tasks: [{
                    description: "Fill out exit tickets",
                    isCompleted: false,
                },
                {
                    description: "Do homework",
                    isCompleted: false,
                }]
            },
        ],
        (error, lists) => {
            if (error) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
            }
            res.status(StatusCodes.OK).send({ message: "Seed successful" });
        }
    );
});

// CRUD (OR MORE LIKE RCUD!)

// READ ALL - find all lists
// router.get("/", isAuthenticatedNormal, (req, res) => {
//     List.find({}, (error, lists) => {
//         if (error) {
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
//         }
//         res.status(StatusCodes.OK).send(lists);
//     }).populate('category');
// });

// populate test
router.get("/", isAuthenticatedNormal, (req, res) => {
    List.find({}).populate('category').exec((error, lists) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(lists);
    });
});

// READ ONE - find one list
router.get("/:id", isAuthenticatedNormal, (req, res) => {
    List.findById(req.params.id, (error, list) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(list);
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
            const locals = { list: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            // Data from form is valid.
            const list = req.body; // extract the data from POST
            List.create(list, (error, list) => {
                res.status(StatusCodes.CREATED).send(list);
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
            const locals = { list: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            List.findByIdAndUpdate(
                req.params.id, // 1st arg - criteria => id
                req.body, // 2nd arg - what to update
                { new: true }, // 3rd arg - { new : true }
                (error, list) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                    }
                    res.status(StatusCodes.OK).send(list);
                }
            );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    List.findByIdAndRemove(req.params.id, (error, list) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(list);
    });
});

module.exports = router;