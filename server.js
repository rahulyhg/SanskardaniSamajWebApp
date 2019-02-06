const express=require('express');
const app=express();
const path=require('path');

app.use(express.static(__dirname + '/dist/SanskardaniSamajWebApp'));

let port = process.env.PORT||8080;

app.listen(port,() => console.log(`Application started at port ${port}`));

//PathLocationStradegy

app.get('', function(req, res) {
    res.sendFile(path.join(__dirname,'/dist/SanskardaniSamajWebApp/index.html'));
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/SanskardaniSamajWebApp/index.html'));
});

//console.log('Console Listening'); 