const express = require("express");

const router = express.Router();
const {handleGenerateNewURL, handleRedirectURL} = require("../controllers/url");

router.post('/', handleGenerateNewURL);

router.get('/:shortId', handleRedirectURL);

module.exports = router;