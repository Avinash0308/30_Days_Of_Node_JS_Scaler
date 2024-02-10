const express = require("express");

function staticFileServer(req, res) {
  const app = express();

  // Serve static files from the "public" directory
  app.use(express.static("public"));

  // Redirect requests to the root ("/") to "index.html"
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
  });

  // Start the Express application
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}


staticFileServer();