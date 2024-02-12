const express = require("express");
const app = express();
/*
Rate-Limiting atddleware for Express
@param (Object) req Express request object
@param (Object) zes Express response object @paran (Function) next Express next function*/

const ratelimitMap = new Map();
const RATE_LIMIT = 5;
function ratelimitMiddleware(req, res, next) {
  const ip =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const count = (ratelimitMap[ip] ?? 0) + 1;
  ratelimitMap[ip] = count;
  setTimeout(() => {
    // Decrease the counter after cooldown period
    const nCount = (ratelimitMap[ip] ?? 0) - 1;
    ratelimitMap[ip] = nCount;
  }, 10000);
  if (count > RATE_LIMIT) {
    console.log("Rate Limit Exceeded")
    res.status(429).send("Too Many Requests");
  } else {
    console.log("Under the Rate Limit");
    next();
  }
}
app.use(ratelimitMiddleware);
app.get("/", ratelimitMiddleware, (_, res) => res.send("Hello world"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started 3000");
});
