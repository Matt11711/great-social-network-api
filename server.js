// REQUIREMENTS - EXPRESS AND MONGOOSE
const express = require("express");
const mongoose = require("mongoose");

// Express
const app = express();
const PORT = process.env.PORT || 3001;

const { User, Thought, Reaction } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Notedb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));