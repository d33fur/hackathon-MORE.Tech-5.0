import React from "react";
import axios from "axios";
import { Placemark, Map, YMaps, GeolocationControl, Clusterer  } from '@pbe/react-yandex-maps'

import "./map.scss"

import locationDefault from "../../img/Location_Default.svg"
import locationHigh from "../../img/Location_High.svg"
import locationLow from "../../img/Location_Low.svg"
import locationMiddle from "../../img/Location_Middle.svg"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function calcLoadFactor(data) {
    let loadFactor = 2
    const day = new Date().getDay()
    let totalAverageQueueTime = 0
    for (let time of data.averageQueueTime[day]) {
        totalAverageQueueTime += time / 24
    }  
    if (totalAverageQueueTime < 10) {loadFactor = 1}
    if (totalAverageQueueTime < 5)  {loadFactor = 0}
    return 0
}

import freeLoad from "../../img/free.svg"
import mediumLoad from "../../img/medium.svg"
import hardLoad from "../../img/hard.svg"
const loadFactors = {
    0: {text: "низкая загруженность", icon: locationLow},
    1: {text: "средняя загруженность", icon: locationMiddle},
    2: {text: "высокая загруженность", icon: locationHigh}
}


export class OfficesMap extends React.Component {
    state = {
        offices: [],
        loadFactor: 2
    }
    constructor(props) {
        super(props)
        axios.get("http://0.0.0.0:7000/api/get_branches")
        .then(res => {
            this.setState({offices: JSON.parse(res.data).branches})
        }).then(() => {
            this.setState({loadFactor: 0})
        })    
    }
    render = () => {return<>
        <YMaps width="100vw" hieght="100vh" query={{ apikey: "11c3828e-7dc4-416d-8aca-7ee941125afc", lang: 'ru_RU' }} style={{width: "100vw", height: "100vh"}}>
            <Map 
                width="100vw" 
                hieght="100vh"
                style={{width: "100vw", height: "100vh"}}
                state={{zoom:9, center:[55.76, 37.64]}}
            >
                <Clusterer options={{
                    gridSize: 128
                }}>
                    {Array.from(this.state.offices, (val, idx) =>  <>
                    {(() => {if (this.state.loadFactor == 0) return <Placemark
                        key={0}
                        geometry={[val.latitude, val.longitude]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [96, 96],
                            iconImageHref: loadFactors[getRandomInt(3)].icon,
                        }}
                        onClick={() => {}}
                    />})()}
                    {(() => {if (this.state.loadFactor == 1) return <Placemark
                        key={1}
                        geometry={[val.latitude, val.longitude]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [96, 96],
                            iconImageHref: loadFactors[1].icon,
                        }}
                        onClick={() => {}}
                    />})()}
                    {(() => {if (this.state.loadFactor == 2) return <Placemark
                        key={2}
                        geometry={[val.latitude, val.longitude]}
                        options={{
                            iconLayout: 'default#image',
                            iconImageSize: [96, 96],
                            iconImageHref: loadFactors[getRandomInt(3)].icon,
                        }}
                        onClick={() => {}}
                    />})()}
                    </>)}
                </Clusterer>
            </Map>
            <GeolocationControl
                options={{ float: 'right', size: 'auto' }}
            />
        </YMaps>
    </>}
}