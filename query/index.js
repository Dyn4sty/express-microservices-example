const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const posts = {};
app.use(express.json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(
      (commentToFind) => commentToFind.id === data.id
    );
    if (comment) comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("QueryService is listening on port 4002");
  const { data } = await axios.get("http://localhost:4005/events");
  for (let event of data) {
    handleEvent(event.type, event.data);
    console.log("handling", event.type, "Event");
  }
});
