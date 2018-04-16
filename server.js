const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase', (text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');
console.log(__dirname);

app.use((req,res,next)=>{
  now = new Date().toString();
  log = now+' '+req.method+' '+req.url+'\n';
  console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if (err) {
      console.log('Error written to log');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance');
});

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.send('<h1>Hellp Express</h1>');
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.listen(port,()=>{
  console.log('Server is up on port ',port);
});
