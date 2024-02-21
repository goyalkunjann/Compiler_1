const { exec } = require("child_process");
const fs = require("fs").promises; // Use fs.promises for consistency
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

// Ensure the directory exists asynchronously
fs.mkdir(outputPath, { recursive: true }).catch(console.error);

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath, path.extname(filepath)); // More reliable extraction of jobId
    const outPath = path.join(outputPath, jobId);

    return new Promise((resolve, reject) => {
        const compileCommand = `g++ "${filepath}" -o "${outPath}.exe"`;

        exec(compileCommand, (compileError, stdout, stderr) => {
            if (compileError || stderr) {
                return reject(`Compile error: ${compileError}\n${stderr}`);
            }

            // Execute the compiled program
            exec(`"${outPath}.exe"`, (execError, execStdout, execStderr) => {
                if (execError || execStderr) {
                    return reject(`Execution error: ${execError}\n${execStderr}`);
                }
                resolve(execStdout.trim()); // Trim for cleaner output
            });
        });
    });
};

module.exports = executeCpp;