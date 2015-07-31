var http = require('http');
var cheerio = require('cheerio');
var request = require('request');

console.log()

http.createServer(function(req, res) {
  var userAgent = req.headers['user-agent'];
  // console.log(userAgent);
  var userA = encodeURI(userAgent);
  var prefix = 'http://www.useragentstring.com/?uas='
  var postfix = '&getJSON=agent_name-agent_version'
  var userAgentURL = prefix + userA + postfix;
  // console.log(userAgentURL);

  request.get(userAgentURL, function (err, xhr, body) {
    var jso= JSON.parse(body);
    var result = jso.agent_name + ' ' + jso.agent_version;
    console.log(result);
  })
}).listen(2500);