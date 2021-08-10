/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJpeWFuc2h1YmhhbmRhcmkiLCJhIjoiY2tydnJ6Y2o2MDlwMjJucWozZXlnenZtciJ9.EHleuQ4aTwC5ohTKOQHJLA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/priyanshubhandari/ckrvsenpf0f3t18qg7kqiir5g',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });
  map.addControl(new mapboxgl.NavigationControl());

  const bounds = new mapboxgl.LngLatBounds();
  // Bounds Obj is basically the area that will be displayed on the map.

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
      closeOnClick: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
