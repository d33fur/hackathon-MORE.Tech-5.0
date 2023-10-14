import React from "react";
import axios from 'axios';

import { Button, Space, Segmented, Popover } from "antd";
import { useWindowParams } from "../../hooks/useWindowParams";
//import Plot from 'react-plotly.js';

import freeLoad from "../../img/free.svg"
import mediumLoad from "../../img/medium.svg"
import hardLoad from "../../img/hard.svg"
import clock from  "../../img/clock.svg"
import metro from "../../img/metro.svg"
import wheelchair from "../../img/wheelchair.svg" 
import coins from "../../img/coins.svg"

import "./menu.scss"

const loadFactors = {
    0: {text: "низкая загруженность", icon: freeLoad},
    1: {text: "средняя загруженность", icon: mediumLoad},
    2: {text: "высокая загруженность", icon: hardLoad}
}

/*
const content = <>
    <div className="loadGraph">
        <Plot
            data={[
            {
                x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                y: data.averageQueueTime[6],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
                line: {
                    shape: "spline"
                }
            }
            ]}
            layout={ {
                autosize: false,
                width: window.innerWidth * 0.8,
                height: "100%",
                margin: {
                    l: 0,
                    r: 0,
                    b: 120,
                    t: 0,
                    pad: 0
                  },
                xaxis: {
                    zeroline: false,
                    tick0: 0, 
                    dtick: 3
                },
                yaxis: {
                    showgrid: false,
                    zeroline: false,
                    visible: false
                }
            } }
            config={ {displayModeBar: false, displaylogo: false} }
        />
    </div>
</>*/
const content = <></>



type OfficeInfoProps = {
    loadFactor?: Number
    name?: String
    address?: String  
}
type OfficeInfoState = {
    loadFactor?: Number
    name?: String
    address?: String 
}
class OfficeInfo extends React.Component<OfficeInfoProps, OfficeInfoState> {
    loadFactor = 2
    name = ""
    address = ""
    state = {
        loadFactor: 2,
        name: "",
        address: ""
    }
    constructor (props) {
        super(props)
        this.loadFactor = props.loadFactor
        this.name = props.name
        this.address = props.address
        this.state = {
            loadFactor: this.loadFactor,
            name: this.name,
            address: this.address
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.loadFactor !== this.props.loadFactor){
            this.setState({          
                loadFactor: this.props.loadFactor
            });
        }
        if(prevProps.name !== this.props.name){
            this.setState({          
                name: this.props.name
            });
        }
        if(prevProps.address !== this.props.address){
            this.setState({          
                address: this.props.address
            });
        }
    }
    render = () => {return<>
        <li>
            <div className="columns">
                <div>
                    <h2>{this.state.name}</h2>
                    <h3 className="min-t">{this.state.address}</h3>
                </div>
                <div style={{flexShrink: 0}}>
                    <h5 className="min-t">3 мин • 300м</h5>
                </div>
            </div>
        </li>
        <li>
            <Popover content={content} trigger="click"><div className="Option">
                <img src={loadFactors[this.state.loadFactor].icon}></img>
                <div className="optionColumn">
                    <h5 className="min-t">{loadFactors[this.state.loadFactor].text}</h5>
                </div>
            </div></Popover>
        </li>
    </>}
}




type OfficeScheduleProps = {schedule?: Object}
type OfficeScheduleState = {schedule?: Object}
class OfficeSchedule extends React.Component<OfficeScheduleProps, OfficeScheduleState> {
    schedule = "";
    state = {
        schedule: ""
    }
    constructor (props) {
        super(props)
        this.schedule = props.schedule
    }
    componentDidUpdate(prevProps){
        if(prevProps.schedule !== this.props.schedule){
            this.setState({          
                schedule: "всегда"
            });
        }
    }
    render = () => {return<>
        <li>
            <div className="Option">
                <img src={clock}></img>
                <div className="optionColumn">
                    <h3>Режим работы</h3>
                    <h4 className="min-t">{this.state.schedule}</h4>
                </div>
            </div>
        </li>
    </>}
}



type OfficeMetrosProps = {metros?: Array<String>}
type OfficeMetrosState = {metros?: Array<String>}
class OfficeMetros extends React.Component<OfficeMetrosProps, OfficeMetrosState> {
    metros = []
    state = {
        metros: []
    }
    constructor(props) {
        super(props)
        this.metros = props.metros ?? []
    }
    componentDidUpdate(prevProps){
        if(prevProps.metros !== this.props.metros){
            this.setState({          
                metros: this.props.metros
            });
        }
    }
    render = () => {return<>
        <li>
            <div className="Option">
                <img src={metro}></img>
                <div className="optionColumn">
                    <h3>Метро рядом</h3>
                    {Array.from(this.state.metros, (val, idx) => 
                        <h4 key={idx} className="min-t">
                            {val}
                        </h4>
                    )}
                </div>
            </div>
        </li>
    </>}
}



type Currency = {name: String, amount: Number}
type OfficeCurrenciesProps = {currencies?: Array<Currency>}
type OfficeCurrenciesState = {} 
class OfficeCurrencies extends React.Component<OfficeCurrenciesProps, OfficeCurrenciesState> {
    currencies
    state = {
        currencies: []
    }
    constructor(props) {
        super(props)
        this.currencies = props.currencies ?? []
    }
    componentDidUpdate(prevProps){
        if(prevProps.currencies !== this.props.currencies){
            this.setState({          
                changedProp: this.props.currencies
            });
        }
    }
    render = () => {return<>
        <li>    
            <div className="Option">
                <img src={coins}></img>
                <div className="optionColumn">
                    <h3>Валюта</h3>
                    <h4 className="min-t">
                        {(Array.from(this.state.currencies, (val: Currency, _) => val.name).join(", "))}
                    </h4>
                </div>
            </div>
        </li>
    </>}
}


export class Menu extends React.Component {
    loadFactor = 2
    state = {
        top: 60,
        data: {
            averageQueueTime: [[],[],[],[],[],[],[]],
            salePointName: "",
            address: "",
            openHoursIndividual: "",
            metroStation: [],
            currencies: [],
        }
    }
    constructor(props) {
        super(props)
        const day = new Date().getDay()
        axios.get("http://proxy.koteyko.space/api/get_branches")
        .then(res => {
            this.setState({data: JSON.parse(res.data).branches[0]})
            console.log(JSON.parse(res.data).branches[0])
            setTimeout(() => {console.log(this.state.data.salePointName), 500})
            
        })
        let totalAverageQueueTime = 0
        for (let time of this.state.data.averageQueueTime[day]) {
            totalAverageQueueTime += time / 24
        }  
        if (totalAverageQueueTime < 10) this.loadFactor = 1
        if (totalAverageQueueTime < 5) this.loadFactor = 0
        console.log(totalAverageQueueTime)        
    } 
    handleClick = () => {
        this.setState({
            top: this.state.top == 60 ? 5 : 60,
        })
    }
    render = () => {
        return(<>
            <div className="Menu" style={{top:`${this.state.top}vh`, height: `${100-this.state.top}vh`}} >
                <div className="lineBox" onClick={this.handleClick}><div className="line"></div></div>
                <ul>
                    <OfficeInfo 
                        name={this.state.data.salePointName}
                        address={this.state.data.address}
                        loadFactor={this.loadFactor}
                    />
                    <li>
                        <Space.Compact direction="vertical"><Segmented 
                            options={[{
                                label: (<div>Физлица</div>),
                                value: "Физлица"
                            },{
                                label: (<div>Юрлица</div>),
                                value: "Юрлица"
                            }]}
                        />
                        </Space.Compact>
                    </li>
                    <OfficeSchedule
                        schedule={this.state.data.openHoursIndividual}
                    />
                    <OfficeMetros
                        metros={this.state.data.metroStation}
                    />
                    <OfficeCurrencies
                        currencies={this.state.data.currencies}
                    />
                </ul>
            </div>
        </>)
    }
}
