const ssid = require("ssid");
const URL = require("../models/url");
const PORT = 8001

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ err: "url is required"})
    }

    const short_ID = ssid(8, false);

    const url = await URL.create({
        shortId: short_ID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home",{  
        id: short_ID,   // here we're passing an object hence we have to name its specific properties
        port: PORT
    })
}

async function handleRedirectURL(req, res) {
    const short_ID = req.params.shortId;
    const filter = {shortId: short_ID}
    const update = {$push:{visitHistory: {timestamp: Date.now(),}}}
            // Below is the logic for line 23
            // function update (entry) {
            //         entry.visitHistory.push({timestamp: Date.now()})
            //     };
            //     update(entry);
    entry = await URL.findOneAndUpdate(filter,update);
    if(entry){
        return res.redirect(entry.redirectURL);}
    else{
        return res.end("wrong id")
    }
}

async function handleGetAnalytics(req, res) {
    const short_ID = req.params.shortId;
    const entry = await URL.findOne({shortId: short_ID});
    return res.json({
        totalCLicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
    });
}

module.exports = {
    handleGenerateNewURL,
    handleRedirectURL,
    handleGetAnalytics,
};