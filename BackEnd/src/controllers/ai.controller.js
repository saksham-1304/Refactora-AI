const generateContent = require("../services/ai.service");

async function getReview(req, res) {
    const code = req.body.code;
    console.log(`request recieved at ${new Date()}`);

    if (!code) {
        return res.status(400).send("Code is required");
    }
    const response = await generateContent(code);
    res.send(response);

}
module.exports = {
    getReview
};