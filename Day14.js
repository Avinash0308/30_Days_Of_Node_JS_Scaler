const express = require("express");
const app = express();
const memoryCache = require("memory-cache"); // Simple in-memory cache for demonstration

const cacheExpirationTime = 10 * 1000; // 10 sec

function cachingMiddleware(req, res, next) {
  const cacheKey = req.url; // Use request URL as cache key

  // Check if cached response exists and is valid
  const cachedResponse = memoryCache.get(cacheKey);
  if (cachedResponse && cachedResponse.expires > Date.now()) {
    // Cache hit: return cached response
    res.status(cachedResponse.statusCode).send(cachedResponse.body);
    return;
  }

  // Cache miss or expired: proceed to generate response
  next((err) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    // Cache the response
    memoryCache.put(cacheKey, {
      statusCode: res.statusCode,
      body: res._getBody(), // Access raw response body
      expires: Date.now() + cacheExpirationTime,
    });

    res.send(); // Send the generated response
  });
}

// Example usage in an Express app:


// Test case 1: Make a request, cache the response, and make the same request again within the cache expiration time.
app.get("/test1", cachingMiddleware, (req, res) => {
  res.send("Response for test1");
});

// Test case 2: Make a request, cache the response, wait for cache expiration, and make the same request again.
app.get("/test2", cachingMiddleware, (req, res) => {
  res.send("Response for test2");
});

// Start the server
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Test case 1
// Make a request to '/test1'
fetch("http://localhost:3000/test1")
  .then((response) => response.text())
  .then((body) => {
    console.log("Test case 1 - First request:", body); // Output: 'Response for test1'
    // Make the same request again within cache expiration time
    setTimeout(() => {
      fetch("http://localhost:3000/test1")
        .then((response) => response.text())
        .then((body) => {
          console.log("Test case 1 - Second request:", body); // Output: 'Response for test1'
          server.close(); // Close the server after tests are done
        });
    }, 2000); // Wait 2 seconds to ensure cache hasn't expired
  });

// Test case 2
// Make a request to '/test2'
fetch("http://localhost:3000/test2")
  .then((response) => response.text())
  .then((body) => {
    console.log("Test case 2 - First request:", body); // Output: 'Response for test2'
    // Wait for cache expiration (6 minutes)
    setTimeout(() => {
      // Make the same request again
      fetch("http://localhost:3000/test2")
        .then((response) => response.text())
        .then((body) => {
          console.log("Test case 2 - Second request:", body); // Output: 'Response for test2'
          server.close(); // Close the server after tests are done
        });
    }, 11 * 1000); // Wait 11 seconds to ensure cache has expired
  });
