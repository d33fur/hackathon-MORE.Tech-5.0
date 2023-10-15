import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Menu } from "../components/menu/menu";
import { OfficesMap } from "../components/map/map";

import axios from "axios"

import "../components/search/search.scss"
import type { MenuProps } from 'antd';
import { Input, Dropdown } from 'antd'
const { Search } = Input;


import { useWindowParams } from "../hooks/useWindowParams";


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];


type HeaderProps = {}
type HeaderState = {items: MenuProps['items']}
class Header extends React.Component {
  state = {
    items: [
      
    ]
  }
  constructor(props) {
    super(props)
    this.state = {items: this.state.items}
    console.log(this.state.items)
  }
  render = () => {
    let items = this.state.items 
    return<div>
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Search placeholder="input search text" onSearch={(text) => {
        axios.get("http://0.0.0.0:7000/api/search", { params: { query: text}})
        .then(res => {
                this.setState({items: (Array.from(res.data, (val, idx) => {return {
                    key: idx, 
                    label: (<h3 target="_blank" rel="noopener noreferrer">{val}</h3>)
                }
            }))})
        })}}
        enterButton />
    </Dropdown>
  </div>}
}

export function App() {
    const windowParams = useWindowParams();
    const [width, height] = windowParams.size;
    const ratio = windowParams.ratio
    const search = useRef(null)
    return (<>
        <div className="typeSystemGrid">
            <OfficesMap ref={search}/>
            <Header/>
            <Menu onRouteCreate={(cords) => {console.log(search.current); search.current.createRoute(cords)}}></Menu>
        </div>
    </>)
}