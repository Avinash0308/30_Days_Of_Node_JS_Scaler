const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey =
  "00668f77a1e5c2582d72a817c8a3a597000b8d8e53a52835d145867f4814a8f01b";
const users = [
  { id: 1, username: "admin", password: "adminpassword", role: "admin" },
  { id: 2, username: "user", password: "userpassword", role: "user" },
];
app.use(express.json());
function authenticateAndAuthorize(req, res, next) {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token: ", decoded);
    req.user = decoded;
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message:
          "Access Denied. You do not have role specified for accessing it",
      });
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return rmSync.status(400).json({ message: "Invalid Token." });
  }
}
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      secretKey
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.get("/admin", authenticateAndAuthorize, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
