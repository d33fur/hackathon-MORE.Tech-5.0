import React from 'react';
import { createRoot } from 'react-dom/client';

import "./styles/fonts.scss";

import { App } from './app/app';




const root_tag = document.getElementById('root')

// ymaps.ready(init);
async function getRoutes(start, endpoints) {
    var referencePoints = [start]
    for (var endpoint of endpoints) {
        referencePoints.push(endpoint)
        referencePoints.push(start)
    }
    var routes = []
    function init(ymaps) {
        var multiRoute = new ymaps.multiRouter.MultiRoute({   
            // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
            referencePoints: referencePoints
        });
        multiRoute.model.events.add('requestsuccess', function() {
            // Получение ссылки на активный маршрут.
            var activeRoute = multiRoute.getActiveRoute();
            var paths = activeRoute.getPaths()
            paths.each((path, idx) => {
                idx++;
                if (idx % 2 == 0) {
                    routes.push(path)
                }
            })
        });
        console.log('Done')
    }
    await ymaps.ready(init)
    return routes
}


var myMap;

// Waiting for the API to load and DOM to be ready.
ymaps.ready(init);
function init () {
    /**
     * Creating an instance of the map and binding it to the container
     * with the specified ID ("map").
     */
    myMap = new ymaps.Map('map', {
        /**
         * When initializing the map, you must specify
         * its center and the zoom factor.
         */
        center: [55.76, 37.64], // Moscow
        zoom: 10,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    },
    ), 
    // Creating a geo object with the "Point" geometry type.
    myGeoObject = new ymaps.GeoObject({
        // The geometry description.
        geometry: {
            type: "Point",
            coordinates: [55.8, 37.8]
        },
        // Properties.
        properties: {
            // The placemark content.
            iconContent: 'I\'m draggable',
            hintContent: 'Come on, drag already!'
        }
    }, {
        /**
         * Options.
         * The placemark's icon will stretch to fit its contents.
         */
        preset: 'islands#blackStretchyIcon',
        // The placemark can be dragged.
        draggable: false
    })
    addBranchToMap(0, 55.766045, 37.638081, 2)


    document.getElementById('destroyButton').onclick = function () {
        // To destroy it, the "destroy" method is used.
        myMap.destroy();
    };
    myMap.geoObjects
        .add(myGeoObject);

}

function addBranchToMap(branchId, lat, lon, loadFactors) {
    const markerElement = document.createElement('div');
    markerElement.className = 'marker-class';
    markerElement.innerText = "I'm marker!";

    const marker = new YMapMarker(
    {
        source: 'markerSource',
        coordinates: [lon, lat],
        draggable: true,
        mapFollowsOnDrag: true
    },
    markerElement
    );

    map.addChild(marker);
}


if (root_tag) {
    const root = createRoot(root_tag)
    root.render(
        <App />
    )
}
else console.log("Can't find html root tag id to start app")

