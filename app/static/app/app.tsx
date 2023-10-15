import React from "react";

import { Menu } from "../components/menu/menu";
import { OfficesMap } from "../components/map/map";

import "../components/search/search.scss"
import { Input } from 'antd'
const { Search } = Input;


import { useWindowParams } from "../hooks/useWindowParams";


export function App() {
    const windowParams = useWindowParams();
    const [width, height] = windowParams.size;
    const ratio = windowParams.ratio
    return (<>
        <div className="typeSystemGrid">
            <OfficesMap/>
            <Search placeholder="input search text" onSearch={() => {}} enterButton />
            <Menu></Menu>
        </div>
    </>)
}