// setting up ejs 
// install ejs from npm
// setup ejs as a  view engines

const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');

 
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));   // is used for the path 
app.set('view engine','ejs');


app.get("/",function(req,res){
    //res.send("chal rha hai");
    fs.readdir(`./files`, function(err,files){
        res.render("index",{files:files});     // it will access ejs file stored in view
    });
});

app.get("/file/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename: req.params.filename, filedata: filedata});
    });
          
});

app.get("/edit/:filename",function(req,res){
    res.render('edit',{filename: req.params.filename})      
});

app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    })      
});

app.post("/create",function(req,res){   //to handle the form 
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    });
});


app.listen(3000, function(){
    console.log("it's running");
});







// // app.get("/profile/:iskejagahkchbhi")
// app.get("/profile/:username", function(req,res){
//    // req.params.username                             //params used to get the data used after :colon
//    // res.send("chal rha hai..");
//    res.send(`Welcome, ${req.params.username}`);
// });

// app.get("/profile/:username/:age", function(req,res){
//     res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
//  });
