const predictDayOfWeek = require("./index");

const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/predict', (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const numYear = req.body.numYear;
    const timePeriod = req.body.timePeriod;

    // Predict date
    const prediction = predictDayOfWeek(year, month, day, numYear, timePeriod);
    console.log(prediction)
    res.send({ predict: prediction})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
