const mongoose = require("mongoose");

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
  // MongoDB connection string
  const mongoDBURI = "mongodb+srv://avinash03082003:Js2pNrznztrl0Kvy@projectfrt.ppn0dmb.mongodb.net/ProjectFRT?retryWrites=true&w=majority";

  // Connect to MongoDB
  mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event handlers
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("\nSuccessfully connected to MongoDB");
  });
}

// Call the function to establish the connection
connectToMongoDB();
