import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import * as util from 'js/utils';
import URL from 'constants/url';
import RowFormInputText from 'components/row/RowFormInputText';

const SampleCrud1c = () => {
    const location = useLocation();
    const inputRef = useRef({});

    const searchCondition = location.state?.searchCondition;
    const paginationInfo = location.state?.paginationInfo;

    useEffect(() => {
        
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

                        <h2 className="tit_2">등록화면1</h2>

                        {/* <!-- 상세 --> */}
                        <div className="board_view2">
                            <RowFormInputText title="게시판명"
                                name="bbsNm" placeholder="placeholder는 여기에 쓰세요"
                                ref={inputRef}
                                required={true}
                            />

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="right_col btn1">
                                    <Link to={URL.SAMPLE_CRUD1} className="btn btn_blue_h46 w_100"
                                        state={{
                                            searchCondition: searchCondition,
                                            paginationInfo: paginationInfo,
                                        }}>목록</Link>
                                    <Link to={URL.SUPPORT_DOWNLOAD} className="btn btn_blue_h46 w_100"
                                        state={{
                                            searchCondition: searchCondition,
                                            paginationInfo: paginationInfo,
                                        }}>등록</Link>
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

export default SampleCrud1c;