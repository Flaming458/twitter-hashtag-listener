const http = require('http');
const config = require('./config');
const { TwitterApi } = require('twitter-api-v2');

const handleGetRequest = (req, res) => {
    

  
    const options = {
        hostname: 'api.twitter.com',
        path: '/2/tweets/search/recent?query=cat%20has%3Amedia%20-grumpy&tweet.fields=created_at&max_results=100',
        method: 'GET'
        // headers: {
        //     'Authorization': `Bearer ${config.bearer_token}`
        // }
    }


    const request = http.request(options, response => {
        let data = '';

        response.on('data', (chunk) => {
            console.log(`Retrieved chunk: ${ chunk }`)
            data += chunk;
        });

        response.on('end', () => {
            console.table(`Retrieved Data: ${ data }`);
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





