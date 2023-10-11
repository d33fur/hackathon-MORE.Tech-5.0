import React from "react";

import { useWindowParams } from "../hooks/useWindowParams";

export function App() {
    const windowParams = useWindowParams();
    const [width, height] = windowParams.size;
    const ratio = windowParams.ratio
    return (<>
        <div className="typeSystemGrid">
            <h1 className="maj-t">Лорем импсум</h1>
            <h1 className="min-t">Спорная точка зрения</h1>
            <h2 className="maj-t">Лорем импсум</h2>
            <h2 className="min-t">Спорная точка зрения</h2>
            <h3 className="maj-t">Лорем импсум</h3>
            <h3 className="min-t">Спорная точка зрения</h3>
            <h4 className="maj-t">Лорем импсум</h4>
            <h4 className="min-t">Спорная точка зрения</h4>
            <h5 className="maj-t">Лорем импсум</h5>
            <h5 className="min-t">Спорная точка зрения</h5>
            <h6 className="maj-t">Лорем импсум</h6>
            <h6 className="min-t">Спорная точка зрения</h6>
            <p className="maj-t">Лорем импсум</p>
            <p className="min-t">Спорная точка зрения</p>
            <p className="maj-t overline">Лорем импсум</p>
            <p className="min-t overline">Спорная точка зрения</p>
            <button className="small">Да</button>
            <button className="small">Нет</button>
            <button className="medium">Кнопка</button>
            <button className="large">Кнопка</button>
            <button className="flex">Кнопка</button>
            <div className="card">
                <h3 className="maj-t -cl-2 -ca-c">Лорем импсум</h3>
                <p className="min-t -cl-2 -ca-c">Спорная точка зрения</p>
                <div className="row -cs-1 -ce-2 -ca-s">
                    <button className="small">Да</button>
                    <button className="small">Нет</button>
                </div>
                <button className="small -cs-2 -ce-3 -ca-e">Нет</button>
            </div>
            <h4>Window size {width} x {height}</h4>
            <h4>Pixel Ratio {ratio}</h4>
            <h4>Window calc sise {width / ratio} x {height / ratio}</h4>
        </div>
    </>)
}