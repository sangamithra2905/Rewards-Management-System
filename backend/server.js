const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let rewards = [
  {
    id: 1,
    name: "Discount Coupon",
    points: 100,
  },
];

// Routes for CRUD operations

// Retrieve all rewards
app.get("/rewards", (req, res) => {
  res.json({ rewards });
});

// Add a new reward
app.post("/rewards", (req, res) => {
  const { name, points } = req.body;
  const id = rewards.length + 1;
  const newReward = { id, name, points };
  rewards.push(newReward);
  res.json({ success: true, reward: newReward });
});

// Update an existing reward
app.put("/rewards/:id", (req, res) => {
  const { id } = req.params;
  const { name, points } = req.body;
  const index = rewards.findIndex((reward) => reward.id === parseInt(id));
  if (index !== -1) {
    rewards[index] = { id: parseInt(id), name, points };
    res.json({ success: true, reward: rewards[index] });
  } else {
    res.status(404).json({ success: false, message: "Reward not found" });
  }
});

// Delete an existing reward
app.delete("/rewards/:id", (req, res) => {
  const { id } = req.params;
  rewards = rewards.filter((reward) => reward.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
