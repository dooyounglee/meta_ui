import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import SearchCondition from 'components/search/SearchCondition';
import * as util from 'js/utils';
import Select from 'components/search/Select';
import Bar from 'components/search/Bar';
import InputText from 'components/search/InputText';

const SampleSearchCnd4 = (props) => {
    const searchRef = useRef({});
    
    const check = () => {
        for (var x in searchRef.current) {
            console.log(x, searchRef.current[x].value);
        }
    }

    const search = () => {
        alert("검색");
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className="container">
            <div className="layout">
                <div className="contents NOTICE_LIST" id="contents">
                    {/* <!-- 본문 --> */}

                    <h2 className="tit_2">Search</h2>

                    {/* <!-- 검색조건 --> */}
                    <div className="condition">
                        <ul>
                            <Select
                                ref={searchRef}
                                title="타이틀"
                                name="searchTyp"
                                defaultValue="b"
                                options={[
                                    { label: "코드+내용", value: "ab" },
                                    { label: "코드",      value: "a"  },
                                    { label: "내용",      value: "b"  },
                                ]}
                            />
                            <Bar/>
                            <Select
                                ref={searchRef}
                                title="삭제여부"
                                name="delYn"
                                defaultValue="Y"
                                options={[
                                    { label: "전체", value: ""  },
                                    { label: "Y",    value: "Y" },
                                    { label: "N",    value: "N" },
                                ]}
                            />
                            <Bar/>
                            <InputText
                                ref={searchRef}
                                title="검색어"
                                name="searchWrd"
                                width="w_300"
                                onSearch={search}
                            />
                            <Bar/>
                            <InputText
                                ref={searchRef}
                                title="검색어2"
                                name="searchWrd2"
                                width="w_150"
                                defaultValue="222"
                                onSearch={search}
                            />
                        </ul>
                        <ul>
                            <InputText
                                ref={searchRef}
                                title="검색어3"
                                name="searchWrd3"
                                width="w_300"
                                onSearch={search}
                            />
                            <li>
                                <button className="btn btn_blue_h46 pd35" type="button"
                                 onClick={check}>확인</button>
                            </li>
                        </ul>
                    </div>
                    {/* <!--// 검색조건 --> */}
                    
                    {/* <!--// 본문 --> */}
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}


export default SampleSearchCnd4;