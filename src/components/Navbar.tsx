import { Link } from 'react-router-dom';

export interface tabItem {
    name: string;
    path: string;
}

interface Props {
    page: string
    setPage: (name:string)=>void;
    tabs: tabItem[];
}

export const Navbar = ({page, setPage, tabs}: Props) => {
    return (
        <ul className="nav nav-tabs bg-body-tertiary d-flex justify-content-left fixed-top user-select-none ">
            {tabs.map((item, index)=>(
                <li className="nav-item" key={index}>
                    <Link className={"nav-link text-info " + (page===item.name ? "active" : "")} aria-current="page" to={item.path} onClick={()=>setPage(item.name)}>{item.name}</Link>
                </li>
            ))}
        </ul>
    )
}
