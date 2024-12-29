import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as util from 'js/utils';
import URL from 'constants/url';
import Paging from 'components/layout/Paging';
import Bar from 'components/search/Bar';
import Select from 'components/search/Select';
import InputText from 'components/search/InputText';

function SampleList1() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef({});

    // eslint-disable-next-line no-unused-vars
    const [paginationInfo, setPaginationInfo] = useState(location.state?.paginationInfo); // page
    const [listTag, setListTag] = useState([]);
    const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition);
    console.log(location.state?.paginationInfo)
    console.log(location.state?.searchCondition)

    const handleClick = (e) => {
        e.preventDefault();
        navigate({pathname: URL.SAMPLE_CRUD1C}, {state: {searchCondition: {...util.Etc.getValuesFromRef(searchRef)}, paginationInfo: {...paginationInfo}}});
    }
    const handleClickEdit = (item) => {
    }

    const retrieveList = useCallback((param) => {
        
        // const retrieveListURL = '/sys/message/list';
        // const requestOptions = {
        //     method: "GET",
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         ...util.Etc.getValuesFromRef(searchRef),
        //         pageIndex: paginationInfo.currentPageNo || 1,
        //         pageSize: 10,
        //         ...param
        //     })
        // }

        // util.Fetch.requestFetch(retrieveListURL,
        //     requestOptions,
        //     (resp) => {
                var resp = {};
                resp.data = {
                    pageable: {
                        pageNumber: param ? param.pageIndex || 1 : 1,
                        pageSize: param ? param.pageSize || 10 : 10,
                    },
                    totalElements: 151,
                    content: (Array.from({length: 10}, () => "").map((a,i) => ({
                        msgCd: "XXX-",
                        msgCn: "cn_",
                        delYn: "N",
                    })))
                };

                setPaginationInfo({
                    currentPageNo: resp.data.pageable.pageNumber, // 1 page보내면 결과로 0 page 받음
                    pageSize: 10,
                    totalRecordCount: resp.data.totalElements,
                    recordCountPerPage: resp.data.pageable.pageSize
                })

                let mutListTag = [];
                mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값
                
                const resultCnt = resp.data.totalElements; //const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.data.pageable.pageNumber; // const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.data.pageable.pageSize; // const pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.data.content.forEach(function (item, index) { // resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = util.Page.itemIdxByPageAcsending(resultCnt , currentPageNo, pageSize, index);

                    mutListTag.push(
                        <div className="list_item" key={listIdx}>
                            <div>{listIdx}</div>
                            <div className="list_detail" onClick={() => handleClickEdit(item)}>{item.msgCd+listIdx}</div>
                            <div>{item.delYn}</div>
                            <div className="al">{item.msgCn+listIdx}</div>
                        </div>
                    );
                });
                setListTag(mutListTag);
        //     }
        // );
    },[]);
    
    useEffect(() => {
        // 화면이동 시 담고 있던 조회조건으로 기본값 세팅
        util.Etc.loadSearchCondition(searchRef, searchCondition);

        retrieveList({ pageIndex: paginationInfo?.currentPageNo });
    }, [retrieveList]);
    
    return (
        <div className="container">
            <div className="layout">
                <div className="contents NOTICE_LIST" id="contents">
                    {/* <!-- 본문 --> */}

                    <h2 className="tit_2">메시지 목록</h2>

                    {/* <!-- 검색조건 --> */}
                    <div className="condition">
                        <ul>
                            <Select
                                ref={searchRef}
                                name="searchTyp"
                                defaultValue="ab"
                                options={[
                                    { label: "코드+내용", value: "ab" },
                                    { label: "코드",      value: "a"  },
                                    { label: "내용",      value: "b"  },
                                ]}
                            />
                            <InputText
                                ref={searchRef}
                                name="searchWrd"
                                width="w_300"
                                onSearch={retrieveList}
                            />
                            <Bar/>
                            <li>
                                <button className="btn btn_blue_h46 pd35" type="button"
                                 onClick={() => {console.log(util.Etc.getValuesFromRef(searchRef));retrieveList({ pageIndex: 1 });}}>조회</button>
                            </li>
                        </ul>
                    </div>
                    {/* <!--// 검색조건 --> */}

                    <div className="board_bot">
                        {/* <!-- Paging --> */}
                        <Paging pagination={paginationInfo} moveToPage={passedPage => {
                            retrieveList({ pageIndex: passedPage })
                        }} />
                        {/* <!--/ Paging --> */}
                    </div>
                    
                    {/* <!-- 게시판목록 --> */}
                    <div className="board_list BRD004 mt10">
                        <div className="head">
                            <span>번호</span>
                            <span>메시지 코드</span>
                            <span>삭제여부</span>
                            <span>메시지 내용</span>
                        </div>
                        <div className="result">
                            {listTag}
                        </div>
                    </div>
                    {/* <!--// 게시판목록 --> */}

                    {/* <!-- 등록버튼 --> */}
                    <div className="mt10 al_r">
                        {/* <Button className="btn btn_blue_h46 pd35" onClick={handleClickCreate}>등록</Button> */}
                        <Link to={{pathname:URL.SAMPLE_CRUD1C, state: {searchCondition: searchCondition} }}
                            className="btn btn_blue_h46 pd35" onClick={handleClick}>등록</Link>
                    </div>
                    {/* <!--// 등록버튼 --> */}
                    
                    {/* <!--// 본문 --> */}
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}
export default SampleList1;