const User = require("./User.js"); // Import your User model

/**
 * Express route to calculate the average age of all users in MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function averageAgeOfUsers(req, res) {
  try {
    // Use MongoDB aggregation to calculate average age
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = result[0].averageAge;

    return res.json({ averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = averageAgeOfUsers;
