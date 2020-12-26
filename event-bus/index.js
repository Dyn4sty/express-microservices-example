const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);
  res.status(200).send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("event-bus is listening on 4005");
});
