var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 20,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_phankhoa',
  password        : '8816',
  database        : 'cs290_phankhoa'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', 8816);
app.use(express.static('public'));

app.get('/reset-table',function(req,res,next){
	var context = {};
	pool.query("DROP TABLE IF EXISTS workouts", function(err){
	var createString = "CREATE TABLE workouts(" +
		"id INT PRIMARY KEY AUTO_INCREMENT," +
		"name VARCHAR(255) NOT NULL," +
		"reps INT," +
		"weight INT," +
		"date DATE," +
		"unit BOOLEAN)";
	pool.query(createString, function(err){
		context.results = "Table reset";
		res.render('home',context);
		})
	});
});

app.get('/', function(req, res, next) {
	var context = {};
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
		    next(err);
		  	return;
		}
		var rowData = [];
		for(var i in rows){
			var add = {'name': rows[i].name,
						'reps': rows[i].reps,
						'weight': rows[i].weight,
						'date': rows[i].date,
						'id': rows[i].id,
						'unit': rows[i].unit};
			rowData.push(add);
		}
		context.results = rowData;
		//context.results = JSON.stringify(rows);
		res.render('home', context);
		});
	});

app.get('/insert', function(req, res, next){
  var context = {};
	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?, ?, ?, ?, ?)", 
		[req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.unit], function(err, result){
    if(err){
    	next(err);
    	return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home', context);
	});
});

app.get('/delete', function(req, res, next){
  var context = {};
	pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
	    if(err){
	    	next(err);
	    	return;
	    }
	    pool.query('SELECT * FROM workouts', function(err, rows, fields){
	    if(err){
	      next(err);
	      return;
    	}
		context.results = rows;
	    res.render('home', context);
		});
	});
});

// app.get('/update', function(req, res, next) {
// 	var context = {};
// 	pool.query("SELECT * FROM `workouts` WHERE id=?", [req.query.id], function(err, rows, fields){
// 		if(err){
// 		    next(err);
// 		  	return;
// 		}
// 		var rowData = [];
// 		for(var i in rows){
// 			var add = {'name': rows[i].name,
// 						'reps': rows[i].reps,
// 						'weight': rows[i].weight,
// 						'date': rows[i].date,
// 						'id': rows[i].id,
// 						'unit': rows[i].unit};
// 			rowData.push(add);
// 		}
// 		context.results = rowData[0];
// 		res.render('updated', context);
// 	});
// });

app.get('/update', function(req,res,next){
	var context = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err){
		    next(err);
		  	return;
		}
		if(result.length == 1){
			var curVals = result[0];
		    pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ",
		    [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, 
		    req.query.date || curVals.date, req.query.unit || curVals.unit, req.query.id],
		    function(err, result){
		        if(err){
		          	next(err);
		         	return;
		        }
		    pool.query("SELECT * FROM `workouts`", function(err, rows, fields){
				if(err){
				    next(err);
				  	return;
				}
					var rowData = [];
					for(var i in rows){
						var add = {'name': rows[i].name,
									'reps': rows[i].reps,
									'weight': rows[i].weight,
									'date': rows[i].date,
									'id': rows[i].id,
									'unit': rows[i].unit};
						rowData.push(add);
					}
					context.results = rowData;
					res.render('home', context);
				});
			});
    	}
 	});
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
