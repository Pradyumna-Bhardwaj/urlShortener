const express = require("express");
const URL = require('../models/url.js')
const router = express.Router();
const {handleGenerateNewURL, handleRedirectURL, handleGetAnalytics} = require("../controllers/url");

router.post('/', handleGenerateNewURL);
router.get('/test', async(req, res) => {
    const allUrls = await URL.find({});
    return res.end(`
        <html>
            <head></head>
            <body>
            <ol>
                ${allUrls. map ((url) =>`<li>${url. shortId} - ${url. redirectURL} = ${url. visitHistory. length}</li>`).join("")}
                </ol>
            </body> 
        </html>`);
})
router.get('/:shortId', handleRedirectURL);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;