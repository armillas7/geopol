$(document).ready(function () {

    var year = 1946;
    var map;

    addMap();
    addSlider();

    function addMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaWxsYXM3IiwiYSI6ImNrNDh0YTJrbzE1bXIzc3BqMGk2cjh0MW4ifQ.BsJudZIqIKLsc0k1YCPMFg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/armillas7/ck6uy65zq028g1iqlloktwhac'
        });

        map.on('load', function () {
            addCountries();

            function addCountries() {
                map.addSource("countries-source", {
                    type: "vector",
                    url: "mapbox://armillas7.a8m6dwuc"
                });

                map.addLayer({
                    id: "countries",
                    type: "fill",
                    source: "countries-source",
                    'source-layer': "shp-7izibe",
                    'paint': {
                        'fill-color': {
                            property: 'prova_' + year,
                            type: 'interval',
                            stops: [
                                [6, '#e7d01d'],
                                [8, '#be801e'],
                                [10, '#e7271d']
                            ]
                        },
                        'fill-opacity': 0.4
                    }
                });
            }
        });
    }

    function addSlider() {
        $("#slider").slider({
            orientation: "vertical",
            value: 1946,
            min: 1946,
            max: 2018,
            step: 1,
            slide: function (event, ui) {
                year = ui.value;
                map.setPaintProperty('countries', 'fill-color', {
                    property: 'prova_' + year,
                    type: 'interval',
                    stops: [
                        [6, '#e7d01d'],
                        [8, '#be801e'],
                        [10, '#e7271d']
                    ]
                });
            }
        });
    }
});