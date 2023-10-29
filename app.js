const path = require('path');
const predictDayOfWeek = require("./index");

const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'predict.html'));     
});

app.post('/predict', (req, res) => {
    console.log(req.body)
    const year = parseInt(req.body.year);
    const month = parseInt(req.body.month);
    const day = parseInt(req.body.day);
    const numYear = parseInt(req.body.numYear);
    const timePeriod = req.body.timePeriod;

    // Predict date
    const prediction = predictDayOfWeek(year, month, day, numYear, timePeriod);
    console.log(prediction)
    res.send({ predict: prediction})
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
