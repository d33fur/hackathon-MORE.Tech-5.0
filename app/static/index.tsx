import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';



const root_tag = document.getElementById('root')
if (root_tag) {
    const root = createRoot(root_tag)
    root.render(
        <App />
    )
}
else console.log("Can't find html root tag id to start app")