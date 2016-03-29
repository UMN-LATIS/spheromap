module.exports = {

  parseLayers: function(jsonData) {

    var layers = {};

    jsonData.forEach(function(tour) {
      console.log("Loading tour: " + tour.tour_name);

      var photoLayer = new L.featureGroup();

      tour.photos.forEach(function(photo){
        var marker = L.circle([photo.lat, photo.long], 50, {
          color: tour.color,
          fillColor: tour.color,
          fillOpacity: 0.5
        }).addEventListener("click", showPhotosphere);

        marker.filename = photo.filename;
        marker.addTo(photoLayer);
      });
    });

    return layers;
  },

  zoomMap: function(mapLayer) {

  }
};
