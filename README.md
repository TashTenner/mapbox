# Create a simple map view with Mapbox 

----
## New repository

Start with a new repository following this example: [bestweb] (https://github.com/TashTenner/bestweb)

These are the folders and files you will have:

* bin >> (www.js)
* node_modules
* public >> images, javascripts, stylesheets (style.css)
* routes >> (index.js, users.js)
* views >> (error.hbs, index.hbs, layout.hbs)
* (.eslintrc.json)
* (.gitignore)
* (app.js)
* (package-lock.json)
* (README.md)

## Go to [Mapbox] (https://www.mapbox.com/install/js/)

Register and sign in to your Mapbox account to display your access token.
Select: "Use the Mapbox CDN" and follow the steps

* Go to layout.hbs and copy these two lines in the <head> of your HTML file.

```HTML
<script src='https://api.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
```

* In your style.css you would add:

```CSS
#map { 
  position: absolute; 
  top: 0; 
  bottom: 0; 
  width: 100%; 
}
```

* The following code goes into index.hbs:

```HTML
<div id="map"></div>
<script src="/javascripts/mapbox.js"></script>
```

* In public >> javascripts, create a new .js file, eg mapbox.js. By adding the code above you will have a map that zooms to Barcelona. Remeber you registered with Mapbox? The access token 'pk.ey..." is a public one or you might want to use a personal you can create on Mapbox.

```javascript
mapboxgl.accessToken = 'pk.eyJ1IjoidGFzaGJjbiIsImEiOiJjazB2MnNxc3AwczVuM2NwY3ZmMnFtcGtsIn0.gS1ialg1lO0d8qk5P9Z2pw';
var map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v10",
  center: [2.1734, 41.3851],
  zoom: 6.5
});
```

* To add a search bar and jump from city to city, you need to add in the <head> of layout.hbs the first code and in mapbox.js the second code:

```HTML
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.4.1/mapbox-gl-geocoder.css' type='text/css' />
```

```javascript
map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
}));
```

* Add zoom and rotation controls to the map by adding this code to mapbox.js:

```javascript
map.addControl(new mapboxgl.NavigationControl());
```

* Add geolocation to mapbox.js:

```javascript
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
}));
```

* Click and fly to a point on the map, by adding this long code to mapbox.js:

```javascript
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
-2.3522,
-48.8566
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
map.flyTo({center: e.features[0].geometry.coordinates});
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
```

* Display driving / walking directions:

```HTML
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.css' type='text/css' />
```

```javascript
map.addControl(new MapboxDirections({
  accessToken: mapboxgl.accessToken
  }), 'top-left');
```