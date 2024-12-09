import React, { useEffect, useState } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';

import URL from 'constants/url';
import * as util from 'js/utils';

function Header({ menus }) {
    const location = useLocation();
    const [mainMenus, setMainMenus] = useState([]);
    const usrNm = util.Auth.getUserInfo("usrNm");

    const logout = () => {
        util.Auth.logout();
        window.location = URL.LOGIN;
    }

    useEffect(() => {
        setMainMenus(
            menus.filter(m => m.menuLevel === 1)
                .map((m,i) => (
                    <li key={i}><NavLink to={m.menuPath} className={({ isActive }) => (isActive || (location.pathname.substring(0,4) === m.menuPath)) ? "active" : ""}>{m.menuName}</NavLink></li>)
                )
        )
    }, [,location]);

    return (
        // <!-- header -->
        <div className="header">
            <div className="inner">
                <Link to={URL.MAIN} className="ico lnk_go_template" target="_blank">홈페이지 템플릿 소개 페이지로 이동</Link>
                
                <div className="info">
                    <Link to={URL.MAIN} className="w"><img src="/assets/images/oti_logo.png" alt="oti" /></Link>
                    <p className="copy">Copyright © 2021 Ministry Of The Interior And Safety. All Rights Reserved.</p>
                </div>

                <div className="gnb">
                    <h2 className="blind">주메뉴</h2>
                    <ul>
                        {mainMenus}
                    </ul>
                </div>

                {/* <!-- PC web에서 보여지는 영역 --> */}
                <div className="user_info">
                    <span className="person">{usrNm} </span> 님이 로그인하셨습니다.
                    <button onClick={logout} className="btn">로그아웃</button>
                </div>
                {/* <!--// PC web에서 보여지는 영역 --> */}
            </div>
        </div>
        // <!--// header -->
    );
}

export default Header;