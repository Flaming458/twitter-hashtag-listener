const http = require('http');
//const Twit = require('twit');
const config = require('./config');

const handleGetRequest = (req, res) => {
    
    const options = {
        hostname: 'api.twitter.com',
        path: '/2/tweets/search/recent?query=from:twitterdev',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${config.bearer_token}`
        }
    }


    const request = http.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log(`Retrieved Data: ${ data }`);
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
  const { port } = server.address();

  console.log(`Serveur lancé: http://localhost:${port}`);
});





