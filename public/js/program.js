document.addEventListener('DOMContentLoaded', function () {

    
    /*var HOsLayer = L.geoJSON(HOs).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).bindTooltip(function (data) {
        return data.feature.properties.DWGNAME;
    });
    
    var turnoutsGeo = L.geoJSON(simpleTurnouts).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).bindTooltip(function (data) {
        return data.feature.properties.Name;
    });*/
   /*  var wmsLayer = L.tileLayer.wms('http://localhost:7000/geoserver/wfs', {
        layers: ['Marmaray:KAZ-YSK_ALN_Polyline',
                 'Marmaray:KAZ-YSK_ALN-Chainage'],
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
    }); */
    
    
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    
    

    var map = L.map('map', {
        center: [41, 29],
        zoom: 15,
        maxZoom: 20,
        layers: [baseLayer]
    });


    var i = 1;
    $('#cekbox').on('change', function () {
        if (i == 1) {
            turnoutsGeo.remove();
            i = 0;
        } else {
            turnoutsGeo.addTo(map);
            i = 1;
        }
    });

    map.on('click', function (e) {
        console.log(e.latlng);
        var array = e.latlng;
        
        $.ajax({
            type:'POST',
            url: '/addMarker',
            data: {
                lat: array.lat,
                lng: array.lng
            },
            success: function () {
                console.log('success');
            }
        });
    });
    
    





      

});
