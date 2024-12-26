import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { read, utils, writeFile } from 'xlsx';
import * as util from 'js/utils';

import URL from 'constants/url';
import Button from 'components/basic/Button';

function SampleExcel1() {

    const location = useLocation();

    // eslint-disable-next-line no-unused-vars
    const [option, setOption] = useState({ skipHeader: "true", extension: 'xlsx' });
    const [list, setList] = useState([]);
    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback(() => {
            let mutListTag = [];
            listTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값

            // 리스트 항목 구성
            list.forEach(function (item, index) {
                if (index === 0) mutListTag = []; // 목록 초기화

                mutListTag.push(
                    <div key={index} className="list_item">
                        <div>{index}</div>
                        <div>{item.bbsNm}</div>
                        <div>{item.bbsId}</div>
                        <div>{item.bbbsNo}</div>
                        <div>{item.bbsTyCodeNm}</div>
                        <div>{item.bbsAttrbCodeNm}</div>
                    </div>
                );
            });
            
            setListTag(mutListTag);
        }
    );

    // 엑셀 해더
    const headings = [[
        'bbsNm',
        'bbsId',
        'bbbsNo',
        'bbsTyCodeNm',
        'bbsAttrbCodeNm'
    ]];

    // 양식 다운로드
    const handleForm = () => {
        util.Excel.formDownload({
            headings,
            sheetNm: '양식시트명',
            fileNm: '양식파일명',
            extension: option.extension // .xlsx .xls .csv
        });
        // 또는
        // util.Excel.exportExcel({
        //     headings,
        //     data: [],
        //     sheetNm: '양식시트명',
        //     fileNm: '양식파일명',
        //     extension: option.extension // .xlsx .xls .csv
        // });
    }

    const keys = [
        'bbsNm',
        'bbsId',
        'bbbsNo',
        'bbsTyCodeNm',
        'bbsAttrbCodeNm',
    ];

    // 파일 불러오기
    const handleImport = (e) => {
        util.Excel.importExcel(e, keys, function (data) {
            console.log("화면 import 결과", data)
            setList(data);
        });
    }

    // 파일로 내보내기
    const handleExport = () => {
        
        util.Excel.exportExcel({
            headings,
            data: list,
            sheetNm: '시트명',
            fileNm: '파일명',
            extension: option.extension // .xlsx .xls .csv
        });
    }

    useEffect(() => {
        retrieveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    return (
        <div className="container">
            {/* <div className="c_wrap"> */}
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>게시판생성 관리</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    {/* <EgovLeftNav></EgovLeftNav> */}
                    {/* <!--// Navigation --> */}

                    <div className="contents BOARD_CREATE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        {/* <div className="top_tit">
                            <h1 className="tit_1">사이트관리</h1>
                        </div> */}

                        <h2 className="tit_2">게시판생성 관리</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    {/* <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선택"
                                            onChange={e => setOption({ ...option, skipHeader: e.target.value })}>
                                            <option value="true">skipHeader: true</option>
                                            <option value="false">skipHeader: false</option>
                                        </select>
                                    </label> */}
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선택"
                                            onChange={e => setOption({ ...option, extension: e.target.value })}>
                                            <option value="xlsx">xlsx</option>
                                            <option value="xls">xls</option>
                                            <option value="csv">csv</option>
                                        </select>
                                    </label>
                                </li>
                            </ul>
                            <br></br>
                            <ul>
                                <li>
                                    <Button className="btn btn_blue_h46 pd35" onClick={handleForm}>양식다운</Button>
                                </li>
                                <li>
                                    <input type="file" name="file" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                </li>
                                <li>
                                    <Button className="btn btn_blue_h46 pd35" onClick={handleExport}>export</Button>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// 검색조건 --> */}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD006">
                            <div className="head">
                                <span>번호</span>
                                <span>게시판명</span>
                                <span>게시판유형</span>
                                <span>게시판속성</span>
                                <span>생성일</span>
                                <span>사용여부</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SampleExcel1;