const http = require('http');
const Twit = require('twit');
const config = require('./config');

console.log(config);

// Handle GET Request
const handleGetRequest = (req, res) => {
  const options = {
    hostname: 'api.twitter.com',
    hashtag: '2/tweets/search/recent?query=from:twitterdev',
    method: 'GET'
  }

  let T = new Twit(config);


  const searchedData = (err, res) => {

    console.log(res);

}

T.get(options.hostname, options.hashtag,searchedData);

  const request = http.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', (chunk) => {
      res.end(data);
    });
  });

  request.end()
}

// Creates server instance
const server = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

// Starts server listening on specified port
server.listen(8080, () => {
  const { address, port } = server.address();

  console.log(`Serveur lancé: http://localhost:${port}`);
});





