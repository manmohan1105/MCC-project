var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");

// connection variable	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'form'
});
 
// connection.connect();
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);
//Middleware
app.listen(8080)