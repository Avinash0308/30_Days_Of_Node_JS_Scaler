const path = require("path");

function resolvePath(relativePath) {
  const absolutePath = path.resolve(__dirname, relativePath);
  console.log("\nResolved Path:", absolutePath);
  console.log("\n");
}

// Test Cases
resolvePath("../30_Days_Of_Node_Js_Scaler/test-files/file1.txt");
resolvePath("nonexistent-folder/file.txt");