import React from 'react';

import URL from 'constants/url';
import * as util from 'js/utils'

const SamplePopup1 = () => {
    const handleClickOpen1 = () => {
        util.Popup.open(URL.SAMPLE_POPUP1_P1, "popupname", {width:400,height:700}, {a:"A",b:"B"}, (val) => {
            console.log("자식창 close", val);
        })
    }
    
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
                    <div className="contents BOARD_CREATE_REG" id="contents">
                        {/* <!-- 본문 --> */}
                        <div className="top_tit">
                            <h1 className="tit_1">Popup1</h1>
                        </div>
                            <h2 className="tit_2">팝업1</h2>
                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="modal">새창으로(util)</label></dt>
                                <dd>
                                    <button className="btn btn_skyblue_h46" onClick={handleClickOpen1}>
                                        새창으로
                                    </button>
                                </dd>
                            </dl>
                        </div>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}
export default SamplePopup1;