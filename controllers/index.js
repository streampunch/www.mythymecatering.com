module.exports.set = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index', {
			title : 'MyThyme Catering Service',
			description : "You will love our food",
		});
	});
	app.post('/email', function (req, res) {
		var email = require('../lib/email.js');
		email.send({
		    from: process.env.EMAIL_FROM,
		    to: "yoogene50@gmail.com",
		    subject: req.body.subject, 
		    html: req.body.html
		}, function(data) {
			res.json(data);
		});
	});
	// 404
	app.use(function(req, res, next){
	  res.status(404);

	  // respond with html page
	  if (req.accepts('html')) {
	    res.render('404', {
			title : '404',
			description: 'The page you requested could not be found'
		});
	    return;
	  }

	  // respond with json
	  if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	  }

	  // default to plain-text. send()
	  res.type('txt').send('Not found');
	});
};