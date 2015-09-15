var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var userRequest = 'flexbox';
var browserName = 'chrome';
var browserVersion;
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
    var browser = JSON.parse(body);
    browserName = browser.agent_name;
    browserVersion = parseInt(browser.agent_version)
    var result =  browserName+ ' ' + browserVersion;
    console.log(result);
  });

  request.get('http://caniuse.com/flexbox', function (err, xhr, body) {
    // var char = cheerio.find('chrome');
    // console.log(body);
    var $ = cheerio.load(body);
    var browser = $(body).find('.browser--chrome' + browserName).next().children().each(function () {
      if($(this).text() == "44" ) {
        var result = $(this).attr('title').split('-')[1].trim();
        console.log(result)
      }
    });
    // console.log(browser);
  })

}).listen(2500);
