var http        = require('http'),
    sys         = require('sys'),
    querystring = require('querystring');

// Create the listening server
http.createServer(function(request, response) {
    sys.puts('Request for ' + request.url);

    switch (request.url) {
        case '/':
            response.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            response.write(
                '<form action="/post_to_me" method="post">' +
                'Field 1: <input type="text" name="field_1"><br />' +
                'Field 2: <input type="text" name="field_2"><br />' +
                '<input type="submit" value="Submit">' +
                '</form>'
            );
            response.end();
            break;
        case '/post_to_me':
            response.writeHead(200, {
                'Content-Type' : 'text/html'
            });

            post_handler(request, function(request_data) {
                response.write(
                    'Full JSON object:<br />' +
                    '<pre>' + sys.inspect(request_data) + '</pre>' +
                    '<hr>' +
                    'Indivudual parameters:<br />' +
                    'Field 1: <strong>' + request_data.field_1 + '</strong><br />' +
                    'Field 2: <strong>' + request_data.field_2 + '</strong><br />'
                );
                response.end();
            });
            break;
    };
}).listen(8080);

function post_handler(request, callback) {
    var _REQUEST = { },
        _CONTENT = '';

    if (request.method === 'POST') {
        request.addListener('data', function(chunk) {
            _CONTENT+= chunk;
        });

        request.addListener('end', function() {
                _REQUEST = querystring.parse(_CONTENT);
            callback(_REQUEST);
        });
    };
};
