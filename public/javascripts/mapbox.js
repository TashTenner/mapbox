// The basics for the map
mapboxgl.accessToken = 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazB2MnNxc3AwczVuM2NwY3ZmMnFtcGtsIn0.gS1ialg1lO0d8qk5P9Z2pw';
var map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v10",
  center: [2.1734, 41.3851],
  zoom: 3.5
});

// Search bar
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
}));

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

// Click and fly to the point
map.on('load', function () {
  // Add a symbol layer.
  map.addLayer({
    "id": "symbols",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                13.4050,
                52.5200

              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                2.3522,
                48.8566
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                0.1278,
                51.5074
              ]
            }
          }
        ]
      }
    },
    "layout": {
      "icon-image": "rocket-15"
    }
  });

  // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
  map.on('click', 'symbols', function (e) {
    map.flyTo({ center: e.features[0].geometry.coordinates });
  });

  // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
  map.on('mouseenter', 'symbols', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'symbols', function () {
    map.getCanvas().style.cursor = '';
  });
});

// Direction bar
map.addControl(new MapboxDirections({
  accessToken: mapboxgl.accessToken
}), 'top-left');