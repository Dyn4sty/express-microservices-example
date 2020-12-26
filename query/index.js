const express = require("express");
const cors = require("cors");

const app = express();
const posts = {};
app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

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

  res.send({});
});

app.listen(4002, () => {
  console.log("listening on port 4002");
});
