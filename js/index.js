/*
    David Armillas Camins
    Febrer del 2020
    Màster SIG
*/

$(document).ready(function () {

    var map;
    var popup;
    var year;
    year = 1948;

    addMap();
    addSlider();

    function addMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaWxsYXM3IiwiYSI6ImNrNDh0YTJrbzE1bXIzc3BqMGk2cjh0MW4ifQ.BsJudZIqIKLsc0k1YCPMFg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/armillas7/ck6uy65zq028g1iqlloktwhac',
            center: [9.667969, 19],
            zoom: 1.8
        });

        map.on('load', function () {
            addCountries();
            addCoups();
            map.setFilter('coups', ['==', 'year', year.toString()]);

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

            function addCoups() {
                map.addSource("coups-source", {
                    type: "vector",
                    url: "mapbox://armillas7.5fisnjge"
                });

                map.addLayer({
                    id: "coups",
                    type: "circle",
                    source: "coups-source",
                    'source-layer': "coups-bnaxdt",
                    'paint': {
                        'circle-radius': [
                            "match",
                            ['get', 'success'],
                            '1',
                            10,
                            '2',
                            8,
                            '3',
                            6,
                            '4',
                            4,
                            4
                        ],
                        'circle-color': '#2f2f2f'
                    }
                });
            }
        });
    }

    map.on('mouseenter', 'coups', function (e) {
        addPopup(e);
    });

    map.on('mouseleave', 'coups', function (e) {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    function addPopup(e) {
        var c_year = e.features[0].properties["year"];
        var c_month = e.features[0].properties["mth"];
        var c_day = e.features[0].properties["day"];
        var c_success = e.features[0].properties["success"];
        var c_leader = e.features[0].properties["leader"];
        var c_deaths = e.features[0].properties["deaths"];
        var c_name = e.features[0].properties["NAME"];

        var popupTxt = '';

        popupTxt +=
            '<div class="popup">' +
                '<div class="popup-icon">' +
                    '<p><img src="img/'+ getCoupImg(c_success) +'" alt="Cop" height="42" width="42"><p>' +
                '</div>' +
                '<div class="popup-txt">' +
                    '<div class="popup-title">' +
                        '<span class="pt-date">' + getPopupDate(c_day, c_month, c_year) + '</span>' +
                    '</div>' +
                    '<div class="details">' +
                        '<div class="detail">' +
                            '<span class="title">País: </span>' +
                            '<span class="detail-txt">' + c_name + '</span>' +
                        '</div>' +
                        '<div class="detail">' +
                            '<span class="title">Resultat: </span>' +
                            '<span class="detail-txt">' + getPopupCoupResult(c_success) + '</span>' +
                        '</div>' +
                        '<div class="detail">' +
                            '<span class="title">Impulsors </span>' +
                            '<span class="detail-txt participants">' + getPopupParticipants(c_leader) + '</span>' +
                        '</div>' +
                        '<div class="detail">' +
                            '<span class="title">Morts: </span>' +
                            '<span class="detail-txt">' + getPopupDeaths(c_deaths) + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'

        popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        popup
            .setLngLat(e.lngLat)
            .setHTML(popupTxt)
            .addTo(map);
    }

    function getCoupImg(success) {
        switch(success) {
            case '1': return 'tank.png';
            case '2': return 'attack.png';
            case '3': return 'soldiers.png';
            case '4': return 'complot.png';
            default: return 'complot.png';
        }
    }

    function getPopupDate(d, m, y) {
        year_txt = '';
        if (d.length > 0) { 
            if (d.length == 1) { year_txt += '0'}
            year_txt += (d + '-') 
        }
        if (m.length > 0) { 
            if (m.length == 1) { year_txt += '0'}
            year_txt += (m + '-') 
        }
        if (y.length > 0) { year_txt += y }
        return year_txt;
    }

    function getPopupCoupResult(success) {
        switch(success) {
            case '1': return 'Cop exitós';
            case '2': return 'Intent fallit';
            case '3': return 'Cop planejat';
            case '4': return 'Complot';
            default: return 'Sense especificar';
        }
    }

    function getPopupParticipants(parts) {
        var parts_txt = parts.replace(';', ',');
        return parts_txt.substr(0,1).toUpperCase()+parts_txt.substr(1);
    }

    function getPopupDeaths(deaths) {
        if (deaths == '999') { return 'Sense dades' }
        return deaths;
    }

    function addSlider() {
        $("#slider").slider({
            value: 1948,
            min: 1948,
            max: 2018,
            step: 1,
            slide: function (event, ui) {
                year = ui.value;
                updateCoups();
                updateCountries();
                updateSliderTxt();
            }
        });
    }

    function updateSliderTxt() {
        $(".info-year-txt").text(year);
    }

    function updateCoups() {
        map.setFilter('coups', ['==', 'year', year.toString()]);
    }

    function updateCountries() {
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

    $(".drop-btn").click(function() {
        $(".drop-info-container").toggle();
    });

    $(window).on("resize", function(event){
        console.log("AA");
        if($(window).width() < 767) {
            console.log("BB");
            $("#slider").slider({
                value: 1948,
                orientation: 'vertical',
                min: 1948,
                max: 2018,
                step: 1,
                slide: function (event, ui) {
                    year = ui.value;
                    updateCoups();
                    updateCountries();
                    updateSliderTxt();
                }
            });
            $("#slider").addClass("vertical");
        }

        if($(window).width() >= 767) {
            $("#slider").slider({
                value: 1948,
                min: 1948,
                max: 2018,
                step: 1,
                slide: function (event, ui) {
                    year = ui.value;
                    updateCoups();
                    updateCountries();
                    updateSliderTxt();
                }
            });
            $("#slider").removeClass("vertical");
        }
    });
});




