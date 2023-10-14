import React from "react";
import axios from "axios";
import { Placemark, Map, YMaps, GeolocationControl  } from '@pbe/react-yandex-maps'

import "./map.scss"

import locationDefault from "../../img/Location_Default.svg"

export class OfficesMap extends React.Component {
    state = {
        offices: []
    }
    constructor(props) {
        super(props)
        axios.get("http://proxy.koteyko.space:7000/api/get_branches")
        .then(res => {
            this.setState({offices: JSON.parse(res.data).branches})
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
                {Array.from(this.state.offices, (val, idx) => 
                <Placemark
                    key={0}
                    geometry={[val.latitude, val.longitude]}
                    options={{
                        iconLayout: 'default#image',
                        iconImageSize: [96, 96],
                        iconImageHref: locationDefault,
                    }}
                    onClick={() => {}}
                />)}
            </Map>
            <GeolocationControl
                options={{ float: 'right', size: 'auto' }}
            />
        </YMaps>
    </>}
}