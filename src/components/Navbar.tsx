import { useState } from "react"
import { Link } from 'react-router-dom';

export interface tabItem {
    name: string;
    path: string;
}

interface Props {
    defaultPage: string
    tabs: tabItem[];
}

export const Navbar = ({defaultPage, tabs}: Props) => {
    const [page, setPage] = useState(defaultPage);

    return (
        <ul className="nav nav-tabs d-flex justify-content-center">
            {tabs.map((item)=>(
                <li className="nav-item">
                    <Link className={"nav-link " + (page===item.name ? "active" : "")} aria-current="page" to={item.path} onClick={()=>setPage(item.name)}>{item.name}</Link>
                </li>
            ))}
        </ul>
    )
}
