const express = require("express");

const router = express.Router();
const {handleGenerateNewURL, handleRedirectURL, handleGetAnalytics} = require("../controllers/url");

router.post('/', handleGenerateNewURL);

router.get('/:shortId', handleRedirectURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;