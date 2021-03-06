document.addEventListener('DOMContentLoaded', function () {



    var alignments = {
        ibrMal: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
            layers: 'Marmaray:IBR-MAL_ALN',
            format: 'image/png',
            transparent: true,
            maxZoom: 21
        }),
        kazYsk: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
            layers: 'Marmaray:KAZ-YSK_ALN',
            format: 'image/png',
            transparent: true,
            maxZoom: 20
        }) 
    }
    
    var ho = L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
            layers: 'Marmaray:HO',
            format: 'image/png',
            transparent: true,
            maxZoom: 20
        });
        
    var chainageText = { 
        ibrMal: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
                    layers: 'Marmaray:IBR-MAL_ALN-ChainageText',
                    format: 'image/png',
                    transparent: true,
                    maxZoom: 20
                }),
        kazYsk: L.tileLayer.wms('http://localhost:7000/geoserver/gwc/service/wms', {
                    layers: 'Marmaray:KAZ-YSK_ALN-ChainageText',
                    format: 'image/png',
                    transparent: true,
                    maxZoom: 20
                })
        }
        
    
    var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	maxZoom: 20,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	opacity: 0.5
    }); 
    


    var map = L.map('map', {
        center: [40.98, 28.95],
        zoom: 12,
        maxZoom: 21,
        layers: [baseLayer, alignments.ibrMal, alignments.kazYsk, ho, chainageText.ibrMal, chainageText.kazYsk ]
    });
    

    var i = 1;
    $('#cekbox').on('change', function () {
        if (i == 1) {
            map.removeLayer(ho);
            map.removeLayer(ho);
            i = 0;
        } else {
            map.addLayer(ho);
            map.addLayer(ho);
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
    
    $('#getChainage').submit(function (e) {
        e.preventDefault();
        console.log('Chainage getted!')
        $.ajax({
          url: '/chainage',
          data: {requestedChainage: $('#km').val()},
          dataType: "json",
          success: function (chainage) {
              console.log(chainage);
              map.setView({
                  lon: chainage.location.coordinates[0],
                  lat: chainage.location.coordinates[1]
              },18);
          }
        });
    });
    $.getJSON("test.geojson",function(data){
        
        // add GeoJSON layer to the map once the file is loaded
        L.geoJson(data).addTo(map);
    });

    





      

});
