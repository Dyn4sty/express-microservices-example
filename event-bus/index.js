const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);
  res.status(200).send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
