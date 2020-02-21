$(document).ready(function () {

    var year = 1948;
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
                    url: "mapbox://armillas7.clyn6acm"
                });

                map.addLayer({
                    id: "countries",
                    type: "fill",
                    source: "countries-source",
                    'source-layer': "democracy-countries-8h1h1r",
                    'paint': {
                        'fill-color': {
                            property: 'qd_' + year,
                            type: 'interval',
                            stops: [
                                [-15, '#FAFAFA'],
                                [-10, '#FF1010'],
                                [-9, '#FE1D0E'],
                                [-8, '#FD2B0C'],
                                [-7, '#FC390A'],
                                [-6, '#FB4708'],
                                [-5, '#FA5507'],
                                [-4, '#F96305'],
                                [-3, '#F87103'],
                                [-2, '#F77F01'],
                                [-1, '#F78D00'],
                                [0, '#E08603'],
                                [1, '#CA8007'],
                                [2, '#B47A0A'],
                                [3, '#9D740E'],
                                [4, '#876E11'],
                                [5, '#716715'],
                                [6, '#5B6118'],
                                [7, '#445B1C'],
                                [8, '#2E551F'],
                                [9, '#184F23'],
                                [10, '#024927']
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
            value: 1948,
            min: 1948,
            max: 2018,
            step: 1,
            slide: function (event, ui) {
                year = ui.value;
                $(".info-year-txt").text(year);
                map.setPaintProperty('countries', 'fill-color', {
                    property: 'qd_' + year,
                    type: 'interval',
                    stops: [
                        [-15, '#FAFAFA'],
                        [-10, '#FF1010'],
                        [-9, '#FE1D0E'],
                        [-8, '#FD2B0C'],
                        [-7, '#FC390A'],
                        [-6, '#FB4708'],
                        [-5, '#FA5507'],
                        [-4, '#F96305'],
                        [-3, '#F87103'],
                        [-2, '#F77F01'],
                        [-1, '#F78D00'],
                        [0, '#E08603'],
                        [1, '#CA8007'],
                        [2, '#B47A0A'],
                        [3, '#9D740E'],
                        [4, '#876E11'],
                        [5, '#716715'],
                        [6, '#5B6118'],
                        [7, '#445B1C'],
                        [8, '#2E551F'],
                        [9, '#184F23'],
                        [10, '#024927']
                    ]
                });
            }
        });
    }
});