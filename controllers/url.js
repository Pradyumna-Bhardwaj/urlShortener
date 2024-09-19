const ssid = require("ssid");
const URL = require("../models/url");

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
    });
    return res.json({ id: url.shortId });
}

async function handleRedirectURL(req, res) {
    const short_ID = req.params.shortId;
    const filter = {shortId: short_ID}
    const update = {$push:{visitHistory: {timestamp: Date.now(),}}}
            // Below is the logic for line 24
            // function update (entry) {
            //         entry.visitHistory.push({timestamp: Date.now()})
            //     };
            //     update(entry);
    entry = await URL.findOneAndUpdate(filter,update);
    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewURL,
    handleRedirectURL,
};