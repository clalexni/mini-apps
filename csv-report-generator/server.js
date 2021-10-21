var express = require('express');
var path = require('path');
var morgan = require('morgan');

var port = 3000;
var app = express();

app.use(morgan('dev')); // this needs to be at the front in order to show
app.use(express.urlencoded({ extended: true })); // content type urlencode, also provide body object to req?
app.use(express.static(path.join(__dirname, 'client'))); //serve static files


// app.get('/', (req, res) => {
//   res.status(200).send('connected');
// })

app.post('/upload_json', (req, res) => {
  console.log(req.body);
  res.status(201).send();
});


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})


