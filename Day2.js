const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.code} - ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}

let content = prompt("Please Input the content to be displayed: ");
// Test Cases
writeToFile('test-files/empty-file.txt', content);
writeToFile('test-files/output.txt', content);
