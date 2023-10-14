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




if (root_tag) {
    const root = createRoot(root_tag)
    root.render(
        <App />
    )
}
else console.log("Can't find html root tag id to start app")

