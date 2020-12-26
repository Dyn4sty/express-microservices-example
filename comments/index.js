const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
const axios = require("axios");
const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] || [];
  res.status(200).json(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id } = req.params;
  const { content } = req.body;

  const comments = commentsByPostId.id || [];
  comments.push({
    id: commentId,
    content,
  });
  commentsByPostId[id] = comments;
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
    },
  });
  res.status(201).json(comments);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Recived Event:", event.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
