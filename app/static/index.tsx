import React from 'react';
import { createRoot } from 'react-dom/client';

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


(async () => {
    if (root_tag) {
        const root = createRoot(root_tag)
        let routes = await getRoutes([55.806788, 37.464589], [[55.728783, 37.610988], [55.734876, 37.59308]])
        console.log(routes)
        console.log(routes.length)
        for (let idx=0; idx<routes.length; idx++) {
            console.log(routes[idx])
            console.log(routes[idx].properties.get('distance'))
            console.log(routes[idx].properties.get('duration'))
        }
        root.render(
            <App />
        )
    }
    else console.log("Can't find html root tag id to start app")
})()
