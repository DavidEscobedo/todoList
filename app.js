const express = require("express");
const res = require("express/lib/response");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

var items = [];

app.get("/", function (req, res) {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-us", options);

    res.render("list", {
        day: day,
        items: items
    });

});

app.post("/", function(req, res){
    items.push(req.body.newItem);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
})