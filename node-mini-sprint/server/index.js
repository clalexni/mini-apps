const http = require('http');
const urlParser = require('url');
const fs = require('fs');


//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
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

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/' && req.method == 'GET') {
    console.log('redirecting');

    // fs.readFile('../client/index.html', (err, data) => {
    //   if (err) {
    //     console.log('Error in reading html', err);
    //   } else {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.end(data);
    //   }
    // });

    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }
  // need to change this to elseif to resolve write after end error
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == 'GET') {
    var data = {quote: quotes[getRandomInt(0, quotes.length)]};
    res.writeHead(200, {...headers, 'Content-Type': 'application/json'}); // this solves CORS
    res.end(JSON.stringify(data));
  } 
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == 'POST') {
    var data = '';
    req.on('data', (chunk) => {
      // need to select Content-Length in postman's header in order to work
      data += chunk.toString();
    });
    req.on('end', function() {
      quotes.push(JSON.parse(data).quote);
      console.log(quotes);
      res.writeHead(201, {...headers, 'Content-Type': 'text/plain'});
      res.end(data);
    });
  }
  else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } 
  else {
    res.writeHead(404,headers);
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
