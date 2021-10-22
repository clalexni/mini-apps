const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
//app.use(express.static(__dirname + '/../client'));

const quotes = [
  'one',
  'two',
  'three',
  'four',
  'five'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.get('/', (req, res) => {
  res.redirect('/quote');
});

app.get('/quote', (req, res) => {
  var data = {quote: quotes[getRandomInt(0, quotes.length)]};
  res.status(200).send(data);
});
app.post('/quote', (req, res) => {
  console.log(req.body.quote);
  quotes.push(req.body.quote);
  res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});