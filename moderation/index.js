const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    data.status = data.content === "orange" ? "rejected" : "approved";
    await axios.post("http://localhost:4001/events", {
      type: "CommentModerated",
      data,
    });
  }
  res.status(200).send("OK");
});

app.listen(4003, () => {
  console.log("listening on port 4003");
});
