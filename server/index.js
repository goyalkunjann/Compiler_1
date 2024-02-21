const express = require('express');
const app = express();
const generateFile = require('./generatefile'); // Adjusted for direct function import
const executeCpp = require('./executeCpp'); // Adjusted for direct function import
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/run", async(req, res) => {
    const { language = 'cpp', code } = req.body;
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(`${language}`, code); // Ensure language is used as file extension
        const output = await executeCpp(filePath);
        res.json({ success: true, filePath, output });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, error: error.toString() });
    }
});

app.listen(8672, () => {
    console.log("Server is listening on port 8672!");
});