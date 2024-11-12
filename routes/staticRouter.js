const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restricTo } = require("../middlewares/auth");

router.get('/admin/urls', restricTo(["ADMIN"]), async(req, res) => {

    if(!req.user) return res.redirect('/login');

    const userUrls = await URL.find({}); 
    return res.render("home",{      // passing variables to html 
        urls: userUrls,
    });
});

router.get('/', async(req, res) => {

    if(!req.user) return res.redirect('/login');

    const userUrls = await URL.find({createdBy: req.user._id}); 
    return res.render("home",{      // passing variables to html 
        urls: userUrls,
    });
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/login', (req, res) => {
    return res.render("login");
});

module.exports = router;