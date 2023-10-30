const path = require("path");
const axios = require('axios');
const predictDayOfWeek = require("./index");

const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "predict.html"));
});

app.post("/predict", async (req, res) => {
  console.log(req.body);
  const year = parseInt(req.body.year);
  const month = parseInt(req.body.month);
  const day = parseInt(req.body.day);
  const numYear = parseInt(req.body.numYear);
  const timePeriod = req.body.timePeriod;

  // Predict date
  const prediction = predictDayOfWeek(year, month, day, numYear, timePeriod);


    // Fetch fact from Numbers API using axios
    try {
        const factResponse = await axios.get(`http://numbersapi.com/${month+1}/${day}/date`);
        const fact = factResponse.data;
        console.log(prediction)
        res.send({ predict: prediction, fact: fact })  // Include fact in the response
    } catch (error) {
        console.error('Error fetching fact:', error);
        res.send({ predict: prediction, fact: 'Could not fetch fact.' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
