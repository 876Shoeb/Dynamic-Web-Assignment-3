let map = L.map('map', { 
    layers: MQ.mapLayer(),
    center: [18.02118, -76.76134],
    zoom: 12
});

 var dir = MQ.routing.directions();

dir.route({
    locations: [
        'liguanea, JA',
        'Barbrican, JA'
    ]
});

CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
           iconUrl: 'img/red.png',
           iconSize: [20,29],
           iconAnchor: [10,29],
           popupAnchor:[0,-29]
        });

        marker = L.marker (location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    },

    createEndMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
           iconUrl: 'img/blue.png',
           iconSize: [20,29],
           iconAnchor: [10, 29],
           popupAnchor:[0,-29]
        });

        marker = L.marker (location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    }
});

map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
}));