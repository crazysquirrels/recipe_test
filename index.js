var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//var connect = "postgres://mijswudcvxfgif:4bfebe8d5e7f9d360439460e8d4bf871501ae8671e8766e098ebdfdc0604a301@ec2-23-23-227-188.compute-1.amazonaws.com:5432/da6en3ip038jf8";
var connect ="postgres://alban:Visa52197@localhost:5432/recipebookdb";

app.get('/', function(request, response) {
  //response.render('pages/index');
  var client = new pg.Client(connect);
  client.connect(function(err) {
      if (err) throw err;

      client.query('SELECT * FROM recipes', function(err, result) {
        if (err) throw err;
        // just print the result to the console
        console.log(result.rows[0]); // outputs: { name: 'brianc' }
        // disconnect the client
        client.end(function(err) {
            if (err) throw err;
        });
        response.render('pages/index', {
            recipes: result.rows
        });
    }); //end query

});

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
