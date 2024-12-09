import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import URL from 'constants/url';

const Location = ({ menus }) => {
    const location = useLocation();
    const [menu,setMenu] = useState({});

    useEffect(() => {
        setMenu(menus.find(v => v.menuPath === location.pathname && v.menuLevel == 2));
    }, [location]);

    return(
        <div className="location">
            <ul>
                <li><Link to={URL.MAIN} className="home" >Home</Link></li>
                <li>{menu.topMenuName}</li>
                <li>{menu.menuName}</li>
            </ul>
        </div>
    )
}
export default Location;
