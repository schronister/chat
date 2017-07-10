// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();



app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

app.get("/scrape", function(req, res) {
  request({url:req.query.url}, function(error, response, html) {
       var $ = cheerio.load(html);
        var title = $("title").text();
        res.send(title);
  })
})

// Main "/" Route.
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})




// Listen on port 3000
app.listen(process.env.PORT|| 3000, function() {
  console.log("App running on port 3000!");
});
