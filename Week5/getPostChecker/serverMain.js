var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8816);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req,res){
  var data = [];
  for (var p in req.query){
    data.push({'name': p,'value': req.query[p]});
  }
  var context = {};
  context.dataList = data;
  res.render('getData', context);
});

app.post('/', function(req,res){
	var dData = [];
  for (var b in req.body){
    dData.push({'name': b,'value': req.body[b]});
  }

  var context = {};
  context.bodyList = dData;
  res.render('postData', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});