var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Structure = require("./models/structures"),
    Chainage = require("./models/chainage")

mongoose.connect("mongodb://localhost/leafletApp", {
    useMongoClient: true
});

var km = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "TEXTSTRING": "6+400", "TEXT_ANGLE": 196.17239379882801 }, "geometry": { "type": "Point", "coordinates": [ 29.077417744662689, 40.969578871764291, 0.0 ] } },
{ "type": "Feature", "properties": { "TEXTSTRING": "6+300", "TEXT_ANGLE": 195.47221374511716 }, "geometry": { "type": "Point", "coordinates": [ 29.07708801971744, 40.970442520183802, 0.0 ] } },
{ "type": "Feature", "properties": { "TEXTSTRING": "6+200", "TEXT_ANGLE": 196.2650146484375 }, "geometry": { "type": "Point", "coordinates": [ 29.076747524819591, 40.971289992949629, 0.0 ] } },
{ "type": "Feature", "properties": { "TEXTSTRING": "6+100", "TEXT_ANGLE": 199.44810485839841 }, "geometry": { "type": "Point", "coordinates": [ 29.076373668103386, 40.972167210895343, 0.0 ] } },
{ "type": "Feature", "properties": { "TEXTSTRING": "6+000", "TEXT_ANGLE": 208.58975219726562 }, "geometry": { "type": "Point", "coordinates": [ 29.075901427945738, 40.97301073386889, 0.0 ] } },
]
};
/*
km.features.forEach(function(feature){
    Chainage.create({
        kmText: feature.properties.TEXTSTRING,
        kmTextAngle: feature.properties.TEXT_ANGLE,
        location: feature.geometry
    },function(err, chainage) {
        if (err) {
            console.log(err)
        } else {
            console.log(chainage);
            chainage.save();
        }
    })    
});
 Structure.create({
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/home", function (req, res) {
    res.render("home");
});

app.get('/chainage', function(req, res) {
    
    km = req.query.requestedChainage;
    Chainage.findOne({kmText: km},function (err, foundChainage) {
        if (err) {
            console.log(err);
        } else {
            res.send(foundChainage);
        }
    });
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
