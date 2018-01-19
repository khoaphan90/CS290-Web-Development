var express = require('express');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var credintials = require('./credintials');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8816);

app.use(bodyParser.urlencoded({extended: false} ));
app.use(bodyParser.json());

app.get('/',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);
  res.render('toDo',context);
});

app.get('/weatherData', function(req, res, next) {
  var context = {};
  var zip = req.zipcode;
  request ('http://api.openweathermap.org/data/2.5/weather?zip=' 
    + zip + '&APPID=' + credintials.own, function(err, res, body) {
      if (!err && res.statusCode < 400){
        var temp = res.main.temp;
        context.temp = temp;
        }
  })
});

app.post('/',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add City']){
    var cityInfo = { 'name': req.body.name,
                      'id:': req.session.curId,
                      'zip': req.body.zip,
                      'minTemp': req.body.minTemp,
                      'maxTemp': req.body.maxTemp};
    req.session.toDo.push({cityInfo});
    req.session.curId++;
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('toDo',context);
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
  console.log('Express started on http://flip3.eng.oregonstate.edu:' 
    + app.get('port') + '; press Ctrl-C to terminate.');
});
