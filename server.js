const express=require('express');
const app=express();
const path=require('path');

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT||8080);

//PathLocationStradegy
app.get('/*', function(req,res) {
  res.redirect(path.join(__dirname + '/dist/index.html'));
});

console.log('Console Listening'); 