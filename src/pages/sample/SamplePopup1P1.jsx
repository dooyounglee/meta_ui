import React, { useEffect } from 'react';

import * as util from 'js/utils'

const SamplePopup1P1 = () => {
    const handleClickOpen = () => {
        util.Popup.windowClose({c:"C", d:"D"});
    }

    useEffect(() => {
        console.log(util.Popup.getOpenerParam())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            {/* <div className="c_wrap"> */}
                {/* <!-- Location --> */}
                {/* <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>사이트관리자 암호변경</li>
                    </ul>
                </div> */}
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    {/* <EgovLeftNav></EgovLeftNav> */}
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_CREATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}
                        <button className="btn btn_skyblue_h46" onClick={handleClickOpen}>닫기</button>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SamplePopup1P1;