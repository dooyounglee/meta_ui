import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import URL from 'constants/url';
// import { default as EgovLeftNav } from 'pms_components/leftmenu/LeftNavExample';
import Paging from 'components/layout/Paging';
import { itemIdxByPage } from 'utils/calc';

function SampleList1() {
    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || { pageIndex: 1, searchCnd: '0', searchWrd: '' });// 기존 조회에서 접근 했을 시 || 신규로 접근 했을 시
    const [paginationInfo, setPaginationInfo] = useState({});
    const cndRef = useRef();
    const wrdRef = useRef();
    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback((srchCnd) => {
        /* const retrieveListURL = '/cop/bbs/selectBBSMasterInfsAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(srchCnd)
        } */
        // EgovNet.requestFetch(retrieveListURL,
        //     requestOptions,
        //     (resp) => {
                var resp = {};
                resp.result = {};
                resp.result.brdMstrVO = {};
                resp.result.paginationInfo = {};
                resp.result.user = {};
                resp.result.resultCnt = 10;
                resp.result.paginationInfo = {};
                resp.result.paginationInfo.currentPageNo = srchCnd.pageIndex;
                resp.result.paginationInfo.pageSize = 10;
                resp.result.paginationInfo.totalRecordCount = 122;
                resp.result.paginationInfo.recordCountPerPage = 10;
                resp.result.resultList = [];
                for (var i=0;i<resp.result.resultCnt;i++) {
                    resp.result.resultList.push({nttId:1,bbsId:1,bbsNm:"bbsNm",bbsTyCodeNm:"bbsTyCodeNm",bbsAttrbCodeNm:"bbsAttrbCodeNm",useAt:"Y",frstRegisterPnttm:"1",inqireCo:"1"});
                }
                setPaginationInfo(resp.result.paginationInfo);
                let mutListTag = [];
                listTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값
                const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.result.paginationInfo.pageSize;
                // 리스트 항목 구성
                resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = itemIdxByPage(resultCnt , currentPageNo, pageSize, index);
                    mutListTag.push(
                        <div
                            to={{pathname: URL.ADMIN_BOARD_MODIFY}}
                            state={{
                                bbsId: item.bbsId,
                                searchCondition: searchCondition
                            }}
                            key={listIdx}
                            className="list_item">
                            <div>{listIdx}</div>
                            <div>{item.bbsNm}</div>
                            <div>{item.bbsTyCodeNm}</div>
                            <div>{item.bbsAttrbCodeNm}</div>
                            <div></div>
                            <div>{item.useAt === "Y" ? "사용" : "사용안함"}</div>
                        </div>
                    );
                });
                setListTag(mutListTag);
    }, [listTag, searchCondition]);
    
    useEffect(() => {
        retrieveList(searchCondition);
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
                        <li>게시판생성 관리</li>
                    </ul>
                </div> */}
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
                                    <span className="lb">검색유형선택</span>
                                    <label className="f_select" htmlFor="searchCnd">
                                        <select id="searchCnd" name="searchCnd" title="검색유형선택" ref={cndRef}
                                            onChange={e => {
                                                cndRef.current.value = e.target.value; 
                                            }}
                                        >
                                            <option value="0">게시판명</option>
                                            <option value="1">게시판유형</option>
                                        </select>
                                    </label>
                                </li>
                                <li className="third_2 R">
                                    <span className="lb">검색어</span>
                                    <span className="f_search w_400">
                                        <input type="text" name="" defaultValue={searchCondition && searchCondition.searchWrd} placeholder="" ref={wrdRef}
                                            onChange={e => {
                                                wrdRef.current.value = e.target.value;
                                            }}
                                        />
                                        <button type="button"
                                            onClick={() => {
                                                retrieveList({ ...searchCondition, pageIndex: 1, searchCnd: cndRef.current.value, searchWrd: wrdRef.current.value });
                                            }}>조회</button>
                                    </span>
                                </li>
                                <li>
                                    <button className="btn btn_blue_h46 pd35">등록</button>
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
                        <div className="board_bot">
                            {/* <!-- Paging --> */}
                            <Paging pagination={paginationInfo} moveToPage={passedPage => {
                                retrieveList({ ...searchCondition, pageIndex: passedPage, searchCnd: cndRef.current.value, searchWrd: wrdRef.current.value })
                            }} />
                            {/* <!--/ Paging --> */}
                        </div>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}
export default SampleList1;