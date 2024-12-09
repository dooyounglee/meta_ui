import React, { useEffect, useContext, useState, useCallback} from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Left = ({ menus }) =>{
    const location = useLocation();
    const pathname = location.pathname;
    const [menu, setMenu] = useState({}); // pathname에 해당하는 메뉴
    const [leftMenus, setLeftMenu] = useState([]); // 같은그룹 메뉴들

    // const menuListInq = useCallback(()=>{
        
    // }, []) 


    useEffect(() => {
        if (pathname !== "/") {
            const _menu = menus.find(m => m.menuPath === pathname && m.menuLevel === 2);
            setMenu(_menu);
            setLeftMenu(
                menus
                    .filter(m => m.menuGroup === _menu?.menuGroup && m.menuLevel === 2)
                    .map((m,i) => (
                        <li key={i}><NavLink to={m.menuPath} className={({ isActive }) => (isActive ? "cur" : "")}>{m.menuName}</NavLink></li>)
                    )
            );
        }
    }, [location]);

    return pathname === "/" ? <></> : (
        <div className="nav">
            <div className="inner">
                <h2>{menu?.topMenuName}</h2>
                <ul className="menu4">
                    {leftMenus}
                </ul>
            </div>
        </div>
    )
}
export default Left;
