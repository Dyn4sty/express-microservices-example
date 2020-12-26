const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const handleEvent = async (type, data) => {
  if (type === "CommentCreated") {
    data.status = data.content === "orange" ? "rejected" : "approved";
    await axios.post("http://localhost:4001/events", {
      type: "CommentModerated",
      data,
    });
  }
};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.status(200).send("OK");
});

app.listen(4003, async () => {
  console.log("ModerationService listening on port 4003");
  const { data } = await axios.get("http://localhost:4005/events");
  for (let event of data) {
    handleEvent(event.type, event.data);
    console.log("handling", event.type, "Event");
  }
});
