var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    pg = require('pg'),
    app = express();

//DB Connect String
var connect = "postgres://mijswudcvxfgif:4bfebe8d5e7f9d360439460e8d4bf871501ae8671e8766e098ebdfdc0604a301@ec2-23-23-227-188.compute-1.amazonaws.com:5432/da6en3ip038jf8";

//Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

//Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname +'/views');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    var client = new pg.Client(connect);
        client.connect(function(err) {
            if (err) throw err;
            // execute a query on our database
            client.query('SELECT * FROM recipes', function(err, result) {
                if (err) throw err;
                // just print the result to the console
                console.log(result.rows[0]); // outputs: { name: 'brianc' }
                // disconnect the client
                client.end(function(err) {
                    if (err) throw err;
                });
                res.render('index', {
                    recipes: result.rows
                });
            }); //end query
        }); //client connect

});
//Server
app.listen(3000, function(){
    console.log('Server started on port 3000');
});