import React from "react";

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

const data = {
    "salePointName": "ДО «ГУМ» Филиала № 7701 Банка ВТБ (ПАО)",
    "address": "Г. Москва, Красная площадь, д. 3",
    "openHoursIndividual": "круглосуточно",
    "hasRamp": true ,
    "metroStation": [
        "Октябрьская (Кольцевая линия)",
        "Октябрьская (Калужско-Рижская линия)",
        "Шаболовская (Калужско-Рижская линия)"
    ],
    "averageQueueTime": [
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 1, 0, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0],
        [0, 0, 0, 0, 20, 10, 2, 5, 5, 5, 3, 4, 6, 7, 12, 5, 6, 4, 9, 12,10, 4, 0, 0]
    ],
    "currencies": [
        {name: "рубль", amount: 10000},
        {name: "доллар", amount: 500},
        {name: "евро", amount: 800}
    ]
}

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
type OfficeInfoState = {}
class OfficeInfo extends React.Component<OfficeInfoProps, OfficeInfoState> {
    loadFactor = 2
    name = ""
    address = ""
    constructor (props) {
        super(props)
        this.loadFactor = props.loadFactor
        this.name = props.name
        this.address = props.address
    }
    render = () => {return<>
        <li>
            <div className="columns">
                <div>
                    <h2>{this.name}</h2>
                    <h3 className="min-t">{this.address}</h3>
                </div>
                <div style={{flexShrink: 0}}>
                    <h5 className="min-t">3 мин • 300м</h5>
                </div>
            </div>
        </li>
        <li>
            <Popover content={content} trigger="click"><div className="Option">
                <img src={loadFactors[this.loadFactor].icon}></img>
                <div className="optionColumn">
                    <h5 className="min-t">{loadFactors[this.loadFactor].text}</h5>
                </div>
            </div></Popover>
        </li>
    </>}
}




type OfficeScheduleProps = {schedule: Object}
type OfficeScheduleState = {}
class OfficeSchedule extends React.Component<OfficeScheduleProps, OfficeInfoState> {
    schedule;
    constructor (props) {
        super(props)
        this.schedule = props.schedule
    }
    render = () => {return<>
        <li>
            <div className="Option">
                <img src={clock}></img>
                <div className="optionColumn">
                    <h3>Режим работы</h3>
                    <h4 className="min-t">{this.schedule}</h4>
                </div>
            </div>
        </li>
    </>}
}



type OfficeMetrosProps = {metros?: Array<String>}
type OfficeMetrosState = {}
class OfficeMetros extends React.Component<OfficeMetrosProps, OfficeMetrosState> {
    metros = []
    constructor(props) {
        super(props)
        this.metros = props.metros ?? []
    }
    render = () => {return<>
        <li>
            <div className="Option">
                <img src={metro}></img>
                <div className="optionColumn">
                    <h3>Метро рядом</h3>
                    {Array.from(this.metros, (val, idx) => 
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
    constructor(props) {
        super(props)
        this.currencies = props.currencies ?? []
    }
    render = () => {return<>
        <li>    
            <div className="Option">
                <img src={coins}></img>
                <div className="optionColumn">
                    <h3>Валюта</h3>
                    <h4 className="min-t">
                        {(Array.from(this.currencies, (val: Currency, _) => val.name).join(", "))}
                    </h4>
                </div>
            </div>
        </li>
    </>}
}


export class Menu extends React.Component {
    loadFactor = 2
    state = {
        top: 60
    }
    constructor(props) {
        super(props)
        const day = new Date().getDay()
        let totalAverageQueueTime = 0
        for (let time of data.averageQueueTime[day]) {
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
                        name={data.salePointName}
                        address={data.address}
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
                        schedule={data.openHoursIndividual}
                    />
                    <OfficeMetros
                        metros={data.metroStation}
                    />
                    <OfficeCurrencies
                        currencies={data.currencies}
                    />
                </ul>
            </div>
        </>)
    }
}
