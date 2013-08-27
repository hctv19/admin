// Node.js entry point
var express = require('express'),
    util = require("util"),
    xml = require('xml2js');
var rest = require("./rest.js");
var app = express();

app.configure(function () {

    app.use(express.bodyParser()); // So req.body is filled in.
    app.use(express.compress()); // Gzip.
    app.use(express.cookieParser()); // For sessions.
    app.use(express.session({ secret: process.env.SECRET || '1234567890SECRET' })); // For sessions.
    app.use(express.static(__dirname + '/static', { maxAge: 86400000 })); // Static file server, maxAge = one day.

});

// Azure ACS will post the token back to the root URL (in the form of XML).
app.post('/', function (req, res) {

    var parser = new xml.Parser();

    parser.on('end', function (result) {

        var token = result['t:RequestSecurityTokenResponse']['t:RequestedSecurityToken'][0]['wsse:BinarySecurityToken'][0]['_'];
        if (token) {

            var decoded = new Buffer(token, 'base64').toString('ascii');
            req.session.jwt = decoded;
            res.redirect('/');
        }
        else {
            return req.body;
        }

    })

    //parser.parseString(req.body['wresult']);

});

// After establishing a session to this server, client code can retrieve a valid JWT.
app.get('/token', function (req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    var response = { 'jwt': req.session.jwt };
    res.write(JSON.stringify(response));
    res.end();

});

app.get('/identity_providers', function (req, res) {
    var options = {
        host: 'liloqui.accesscontrol.windows.net',
        port: 443,
        path: '/v2/metadata/IdentityProviders.js?protocol=wsfederation&realm=http%3a%2f%2flocalhost%2f&reply_to=http%3a%2f%2flocalhost%3a8000%2f&context=&request_id=&version=1.0&callback=',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    rest.getJSON(options, function (statusCode, result) {
        var response = result;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(response));
        res.end();
    });
});



app.listen(process.env.PORT || 8000);