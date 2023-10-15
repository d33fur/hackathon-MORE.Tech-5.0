import React from "react";
import { useRef } from "react";
import { Menu } from "../components/menu/menu";
import { OfficesMap } from "../components/map/map";

import "../components/search/search.scss"
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


export function App() {
    const windowParams = useWindowParams();
    const [width, height] = windowParams.size;
    const ratio = windowParams.ratio
    const search = useRef(null)
    return (<>
        <div className="typeSystemGrid">
            <OfficesMap ref={search}/>
            <div>
                <Dropdown menu={{ items }} placement="bottomLeft">
                    <Search placeholder="input search text" onSearch={() => {}} enterButton />
                </Dropdown>
            </div>
            <Menu onRouteCreate={(cords) => {console.log(search.current); search.current.createRoute(cords)}}></Menu>
        </div>
    </>)
}