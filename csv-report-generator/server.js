var express = require('express');
var path = require('path');
var morgan = require('morgan');
//const bodyParser = require('body-parser');
var {Parser} = require('json2csv');

var port = 3000;
var app = express();

app.use(morgan('dev')); // this needs to be at the front in order to show
app.use(express.json()); //dont need this line?
app.use(express.urlencoded({ extended: true })); // Content-Type urlencode, also provide body object to req? form data?
app.use(express.static(path.join(__dirname, 'client'))); //serve static files


// app.get('/', (req, res) => {
//   res.status(200).send('connected');
// })

app.post('/upload_json', (req, res) => {
  //console.log(JSON.parse(req.body.data));
  console.log(req.body);
  // generate csv
  var csvData = csvGenerator(req.body);
  try {
    var json2csv = new Parser({fields: csvData.fields});
    var csvFile = json2csv.parse(csvData.records);
    res.header('Content-Type', 'text/csv');
    res.attachment('sales_report.csv');
    res.status(201).send(csvFile);
  } catch(err) {
    console.err(err);
    res.status(201).send();
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})

var csvGenerator = (data) => {
  var fields = {};
  var records = [];

  var parseData = (data) => {
    if (data.children && data.children.length === 0)  {
      delete data.children;
      for (var k in data) {
        fields[k] = fields[k] || 0;
      }
      records.push(data);
    } else {
      var childrenData = data.children;
      delete data.children;
      for (var k in data) {
        fields[k] = fields[k] || 0;
      }
      records.push(data);
      childrenData.forEach(child => {
        parseData(child);
      });
    }
  }
  parseData(data);
  return {fields: Object.keys(fields),
          records: records};
}

