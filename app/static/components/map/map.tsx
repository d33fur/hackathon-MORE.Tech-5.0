import React from "react";
import axios from "axios";
import { Placemark, Map, YMaps, Clusterer } from '@pbe/react-yandex-maps'




import "./map.scss"

import locationDefault from "../../img/Location_Default.svg"
import locationHigh from "../../img/Location_High.svg"
import locationLow from "../../img/Location_Low.svg"
import locationMiddle from "../../img/Location_Middle.svg"
import point from "../../img/point.svg"


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
import ymaps from "yandex-maps";
const loadFactors = {
    0: {text: "низкая загруженность", icon: locationLow},
    1: {text: "средняя загруженность", icon: locationMiddle},
    2: {text: "высокая загруженность", icon: locationHigh}
}

var globalUserLocation = {latitude: 55.76, longitude: 37.64}

export class OfficesMap extends React.Component {
    map = null
    state = {
        userLocation: globalUserLocation,
        offices: [],
        loadFactor: 2,
        ymaps: null
    }
    constructor(props) {
        super(props)
        this.map = null
        axios.get("http://0.0.0.0:7000/api/get_branches", { params: { cords: {latitude: globalUserLocation.latitude, longitude: globalUserLocation.longitude} }})
        .then(res => {
            this.setState({offices: JSON.parse(res.data).branches})
        }).then(() => {
            this.setState({loadFactor: 0})
        })    
        setTimeout(() => {
            console.log("HI")
            this.setState({
                userLocation: {latitude: globalUserLocation.latitude, longitude: globalUserLocation.longitude}
            })
        }, 1000)
    }
    getPosition = (ymaps) => {
        ymaps.package.full.geolocation.get({
            // Зададим способ определения геолокации
            // на основе ip пользователя.
            provider: 'yandex',
            // Включим автоматическое геокодирование результата.
            autoReverseGeocode: true
        }).then(function (result) {
            // Выведем результат геокодирования.
            let area = result.geoObjects.get(0).properties.get('boundedBy');
            let latitude = (area[0][0] + area[1][0]) / 2
            let longitude = (area[0][1] + area[1][1]) / 2
            console.log(latitude, longitude)
            globalUserLocation.latitude = latitude;
            globalUserLocation.longitude = longitude;
            console.log(globalUserLocation)
        });
    }
    createRoute = (target) => {
        this.state.ymaps.package.route.route([
            [this.state.userLocation.latitude, this.state.userLocation.longitude],
            [target[0], target[1]]
        ], {
            mapStateAutoApply: true
        }).then((route) => {
            // добавляем маршрут на карту
            route.getPaths().options.set({
                // вы можете настроить внешний вид маршрута
                strokeColor: '#2375E1',
                opacity: 1,
                strokeWidth: 15
            });
            this.map.geoObjects.add(route);
            console.log("THIS IS MAP", this.map)
        })
    }
    onApiAvaliable = (ymaps) => {
        this.setState({ymaps: ymaps})
        this.getPosition(ymaps)
    }
    getPositionMarker = (latitude, longitude) => {
        return <Placemark
            geometry={[latitude, longitude]}
            options={{
                iconLayout: 'default#image',
                iconImageSize: [96, 96],
                iconImageHref: point,
            }}
            onClick={() => {this.createRoute([55.728627, 37.609269])}}
        />
    }
    render = () => {return<>
        <YMaps query={{ apikey: "11c3828e-7dc4-416d-8aca-7ee941125afc", lang: 'ru_RU' }}>
            <Map 
                
                width="100vw" 
                hieght="100vh"
                style={{width: "100vw", height: "100vh"}}
                state={{zoom: 12, center:[55.728627, 37.609269], controls:[]}}
                modules={["package.route", "package.full"]}
                instanceRef={(ref) => {this.map = ref}}
                onLoad={(ymaps: any) => {this.onApiAvaliable(ymaps)}}
                
            > 
                {(() => {return this.getPositionMarker(this.state.userLocation.latitude, this.state.userLocation.longitude)})()}
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
                        onClick={() => {this.createRoute([val.latitude, val.longitude])}}
                    />})()}
                    </>)}
                    </Clusterer>
            </Map>
        </YMaps>
    </>}
}