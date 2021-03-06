const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
const axios = require("axios");
const posts = {};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json("error");
  }
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Recived Event:", event.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("PostsService is Listening on 4000");
});
