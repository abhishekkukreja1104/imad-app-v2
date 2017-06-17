var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'abhishekkukreja1104',
    database: 'abhishekkukreja1104',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
        'article-one': {
         title: 'Article One | Harminder Singh',
         heading: 'Article One',
         date: 'June 12,2017',
         content: ` 
             <p>
                this is the article for my first article. this is the article for my first article.this is the article for my first article.
            </p>
             <p>
                this is the article for my first article. this is the article for my first article.this is the article for my first article.
            </p>
             <p>
                this is the article for my first article. this is the article for my first article.this is the article for my first article.
            </p>`
        },
        'article-two': {title: 'Article Two | Harminder Singh',
         heading: 'Article Two',
         date: 'June 15,2017',
         content: ` 
             <p>
                this is the article for my second article.
            </p>`},
        'article-three': {title: 'Article Three | Harminder Singh',
         heading: 'Article Three',
         date: 'June 20,2017',
         content: ` 
             <p>
                this is the article for my three article.
            </p>`}
        };

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
               <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="device-width,initial-scale=1" />
             <link href="/ui/style.css" rel="stylesheet" />
           
        </head>
        <body>
            <div class="container">
             <div>
                <a href="/">Home</a>
             </div>
             <hr/>
             <h3>
                ${heading}
              </h3>
              <div>
              ${date}
              </div>
              <div>
                 ${content}
              </div>
            </div>
        </body>
        </html>
        `;
        return htmlTemplate;
}




function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512 ');
    return hashed.toString('hex');
    
}
app.get('/hash/:input'); 
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
    
}
var pool = new Pool(config);
 app.get('/test-db',function(req, res){
     pool.query("SELECT = FROM test"), function(err, result) {
         if(err)
         {
             res.status(500).send(err.toString());
             
         } 
         else 
             res.send(JSON.string(fy(result.rows)));
             app.get('/articles/:articleName',function(req, res){
                 pool.query("SELECTB*FROM article WHERE title='"+ req.params.articleName +"'",function(err,result){
                     if(err)
                     {
                         res.status(500).send(err.toString());
                         
                     }else{
                         if(result.rows.length===0)
                         {
                             res.status(404).send('article not found');
                             }else{
                                 var articleData=result.rows[0];
                                 
                                 res.send(createTemplate(articleData));
                                 
                              
                             }
                     }
                 });
             

    
     res.sendFile(path.join(__dirname, 'ui','index.html'));
 });
 
 app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

  var names= [];
        app.get('/submit-name',function(rq,res) { //URL: /submit-name?name=xxxxxx
            //Get the name from the request
            var name = req.params.name;
            
            names.push(name);
            //JSON: Java Script Object Notation
            res.send(JSON.stringify(name));
        });

    app.get('/:articleName', function (req, res){
      // articleName == article-one
      // articles[articleName] == content object for article one
      var articleName = req.params.articleName;
      res.send(createTemplate(articles[articleName]));
 });

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
