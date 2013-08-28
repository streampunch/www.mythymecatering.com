var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	controllers = require('./controllers'),
	http = require('http'),
	path = require('path'),
	engine = require('ejs-locals');
	
app.listen(process.env.PORT || 5000);

app.configure(function() {
	app.engine('ejs', engine);
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
});

controllers.set(app);