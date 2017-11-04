var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Structure = require("./models/structures")

mongoose.connect("mongodb://localhost/leafletApp", {
    useMongoClient: true
});

/* Structure.create({
    strName: "11+586",
    type: "HO",
    NOrevNumber: "36",
    geojson: {"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "LineString","coordinates": [[29.012918472290036,41.010345626044106
                ],
                [
                  28.98691177368164,
                  41.00872642929389
                ]
              ]
            }
          }
        ]
      }
}, function (err, structure) {
    if (err) {
        console.log(err);
    } else {
        structure.save();
    }
}); */

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/home", function (req, res) {
    res.render("home");
});

app.post("/addMarker", function (req, res) {
    console.log('Post methoood!');
    console.log(req.body);
    var location = req.body;
    var newStructure = {
        strName: "1+578",
        type: "HO",
        NOrevNumber: 1255,
        location: {
            type: "Point",
            coordinates: location
        }
    }
    Structure.create(newStructure, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/home');
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server has started");
});  
