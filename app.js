const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const items = [];
const workItems = [];

//home
app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        items: items
    });

});

app.post("/", function(req, res){
    console.log(req.body);
    if (req.body.list === "Work List"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
});


//work
app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", items: workItems});
});

app.post("/work", function(req, res){
    workItems.push(req.body.newItem);
    res.redirect("/work");
});


//about
app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
})