
var express = require('express');
var app = express();
var url = require('url');
var mongoose =  require('mongoose');
mongoose.connect('mongodb://test:test@ds049486.mlab.com:49486/to_do');


app.use(express.static('public'));

var todoschema = new mongoose.Schema({number:Number,url:String});
var link = mongoose.model('urls',todoschema);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/new/https://:ur", function (request, response) {
 
  var num= Math.floor(Math.random()*10000)
  var myurl = url.parse('https://'+String(request.params.ur))
  var data={"original url":myurl['href'],"short url":'https://kiwi-bard.glitch.me/'+num}
  var itemone = link({number:num,url:myurl['href']}).save(function(err){if (err)
    throw err;
     console.log("UrL SAved to database");                                                                   
                                                                       })
  response.send(data);
  });
app.get('/:num',function(request,response)
        {
  var n = Number(request.params.num)
  link.findOne({number:n},function(err,item){
    if(err) throw err;
    console.log(item.url)
  response.redirect(item.url)
  })
  
  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
