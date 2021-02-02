const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { requireAuth } = require('../auth');
const db = require('../db/models/');
const router = express.Router();

router.get('/new', /*csrfToken,*/ requireAuth, (req, res) => {
    res.send('welcome to new song post form');
});

songPostValidation = [
    check('postTitle')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for Post Title')
        .isLength({ max: 200 })
        .withMessage(' Post Title cannot be longer than 200 characters'),
    check('songTitle')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for Song Title')
        .isLength({ max: 100 })
        .withMessage('Song Title cannot be longer than 100 characters'),
    check('artist')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for Artist')
        .isLength({ max: 50 })
        .withMessage('Artist cannot be longer than 50 characters'),
    check('album')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for Album')
        .isLength({ max: 50 })
        .withMessage('Album cannot be longer than 50 characters'),
    check('genre')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a value for Genre')
        .isLength({ max: 50 })
        .withMessage('Genre cannot be longer than 50 characters'),
];
router.post(
    '/new',
    /*csrfToken,*/ requireAuth,
    songPostValidation,
    asyncHandler(async (req, res) => {
        const {
            postTitle,
            songTitle,
            artist,
            album,
            genre,
            songLink,
            body,
        } = req.body;

        const validationErrors = validationResult(req);

        const songPost = db.SongPost.build({
            postTitle,
            songTitle,
            artist,
            album,
            genre,
            songLink,
            body,
            userId: req.session.auth.userId,
        });
        if (validationErrors.isEmpty()) {
            await songPost.save();
            res.redirect('');
        }
        res.end('created new post');
    })
);

module.exports = router;
