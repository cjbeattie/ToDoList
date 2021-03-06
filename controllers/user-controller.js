const bcrypt = require("bcrypt")
const express = require("express");
const User = require('../models/users.js');
const { body, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

// Authentication check middleware
// NORMAL
const isAuthenticatedNormal = (req, res, next) => {
    if (req.session && req.session.currentUser) {
        return next();
    } else {
        res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    }
};
// ADMIN
const isAuthenticatedAdmin = (req, res, next) => {
    if (req.session && req.session.currentUser && req.session.currentUser.isAdmin === true) {
        return next();
    } else {
        res.status(StatusCodes.FORBIDDEN).send({ error: "forbidden" });
    }
};

// CREATE
router.post(
    "/",
    // isAuthenticatedNormal,
    body("username", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { user: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            //overwrite the user password with the hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync()
            );
            User.create(req.body, (err, createdUser) => {
                if (err) {
                    return res.status(400).send({ err })
                }
                console.log("user is created", createdUser);
                res.status(200).send(createdUser);
            });
        }

    });

// READ ALL
router.get("/", isAuthenticatedNormal, (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(users);
    });
});

// // READ ONE
// router.get("/:id", (req, res) => {
//     User.findById(req.params.id, (error, user) => {
//         if (error) {
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
//         }
//         res.status(StatusCodes.OK).send(user);
//     });
// });

// // READ ONE - WITH POPULATE
// router.get("/:id", (req, res) => {
//     User.findById(req.params.id).populate('lists').exec((error, user) => {
//         if (error) {
//             return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
//         }
//         res.status(StatusCodes.OK).send(user);
//     });
// });

// READ ONE - WITH POPULATE
router.get("/:id", (req, res) => {
    User.findById(req.params.id).populate({
        path: 'lists',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'category' }
    }).exec((error, user) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(user);
    });
});

// UPDATE
router.put(
    "/:id",
    isAuthenticatedNormal,
    body("username", "Min Length of 3").trim().isLength({ min: 3 }),
    // body("score", "Must be a number").trim().isNumeric().isLength({ max: 3 }),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors.
            // Errors are returned in an array using `errors.array()`.
            const locals = { user: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            User.findByIdAndUpdate(
                req.params.id, // 1st arg - criteria => id
                req.body, // 2nd arg - what to update
                { new: true }, // 3rd arg - { new : true }
                (error, user) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
                    }
                    res.status(StatusCodes.OK).send(user);
                }
            );
        }
    }
);

// DELETE
router.delete("/:id", isAuthenticatedAdmin, (req, res) => {
    User.findByIdAndRemove(req.params.id, (error, user) => {
        if (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error }); // { error } is the same as error: error!!!
        }
        res.status(StatusCodes.OK).send(user);
    });
});


module.exports = router;