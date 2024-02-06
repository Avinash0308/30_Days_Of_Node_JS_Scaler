const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    const fileExtension = path.extname(filePath);

    if (fileExtension === expectedExtension) {
        console.log(`\nFile has the expected extension: ${expectedExtension}`);
    } else {
        console.log(`\nFile does not have the expected extension. Expected: ${expectedExtension}, Actual: ${fileExtension}`);
    }
}

// Test Cases
checkFileExtension('test-files/file1.txt', '.txt');
checkFileExtension('test-files/output.txt', '.jpg');
