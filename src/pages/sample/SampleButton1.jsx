import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import URL from 'constants/url';
import Button from 'components/basic/Button';

function SampleCreate1(props) {

    const save = () => {
        console.log("save");
    }

    useEffect(() => {
        // initMode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            {/* <div className="c_wrap"> */}
                {/* <!-- Location --> */}
                {/* <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">고객지원</Link></li>
                        <li>소개</li>
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
                            <h1 className="tit_1">예시</h1>                            
                        </div>

                        <h2 className="tit_2">버튼1</h2>

                        {/* <!-- 상세 --> */}
                        <div className="board_view2">

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <Button className="btn btn_blue_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_skyblue_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_primary_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_secondary_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_success_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_danger_h46 w_100" onClick={save}>저장</Button>
                                </div>
                            </div>
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <Button className="btn btn_warning_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_info_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_light_h46 w_100" onClick={save}>저장</Button>
                                    <Button className="btn btn_dark_h46 w_100" onClick={save}>저장</Button>
                                </div>
                            </div>
                            <div className="board_btn_area">
                                <div className="right_col btn2">
                                    <Link to={URL.ADMIN_BOARD} className="btn btn_blue_h46 w_100">목록</Link>
                                    <Link to={URL.SUPPORT_DOWNLOAD} className="btn btn_blue_h46 w_100">등록</Link>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}

                            {/* <!--// 상세 --> */}
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SampleCreate1;