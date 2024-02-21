const fs = require('fs').promises; // Use fs.promises for asynchronous operations
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

const generateFile = async(format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFile(filePath, content); // Use the async writeFile method
    return filePath;
};

module.exports = generateFile; // Export the function directly