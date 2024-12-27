import React, { useState, useEffect, useCallback, useRef } from 'react';

import * as util from 'js/utils';
import Paging from 'components/layout/Paging';
import Button from 'components/basic/Button';
import ModalPop from 'components/layout/ModalPop';
import Select from 'components/search/Select';
import InputText from 'components/search/InputText';
import Bar from 'components/search/Bar';
import SysMessageDetailModal from './components/SysMessageDetailModal';

const SysMessageList = () => {
    const searchRef = useRef({});
    
    const workScCd = [
        {label: '전체', value: ''},
        {label: 'CMM(공통)', value: 'CMM'},
        {label: 'PJT(프로젝트)', value: 'PJT'},
        {label: 'BRD(게시판)', value: 'BRD'},
        {label: 'SCH(일정관리)', value: 'SCH'},
        {label: 'SYS(시스템관리)', value: 'SYS'}
    ];
    const delYn = [
        { value: "", label: "전체" },
        { value: "Y", label: "Y" },
        { value: "N", label: "N" }
    ];

    const [paginationInfo, setPaginationInfo] = useState({}); // page
    const [open, setOpen] = useState(false); // modal
    const [listTag, setListTag] = useState([]);
    const [messageDetail, setMessageDetail] = useState({});

    const handleClickOpen = () => {
        setMessageDetail({ delYn: "N" });
        setOpen(true);
    }
    const handleClickEdit = (item) => {
        setMessageDetail(item);
        setOpen(true);
    }
    
    const retrieveList = useCallback((param) => {
        const retrieveListURL = '/sys/message/list';
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                ...util.Etc.getValuesFromRef(searchRef),
                pageIndex: paginationInfo.currentPageNo || 1,
                pageSize: 10,
                ...param
            })
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setPaginationInfo({
                    currentPageNo: resp.data.pageable.pageNumber + 1, // 1 page보내면 결과로 0 page 받음
                    pageSize: 10,
                    totalRecordCount: resp.data.totalElements,
                    recordCountPerPage: resp.data.pageable.pageSize
                })

                let mutListTag = [];
                mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); // 게시판 목록 초기값
                
                const resultCnt = resp.data.totalElements; //const resultCnt = parseInt(resp.result.resultCnt);
                const currentPageNo = resp.data.pageable.pageNumber+1; // const currentPageNo = resp.result.paginationInfo.currentPageNo;
                const pageSize = resp.data.pageable.pageSize; // const pageSize = resp.result.paginationInfo.pageSize;

                // 리스트 항목 구성
                resp.data.content.forEach(function (item, index) { // resp.result.resultList.forEach(function (item, index) {
                    if (index === 0) mutListTag = []; // 목록 초기화
                    const listIdx = util.Page.itemIdxByPageAcsending(resultCnt , currentPageNo, pageSize, index);

                    mutListTag.push(
                        <div className="list_item" key={listIdx}>
                            <div>{listIdx}</div>
                            <div className="list_detail" onClick={() => handleClickEdit(item)}>{item.msgCd}</div>
                            <div>{item.delYn}</div>
                            <div className="al">{item.msgCn}</div>
                        </div>
                    );
                });
                setListTag(mutListTag);
            }
        );
    },[paginationInfo]);

    useEffect(() => {
        retrieveList();
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
                            {/* <Bar/> */}
                            <InputText
                                ref={searchRef}
                                name="searchWrd"
                                width="w_300"
                                onSearch={retrieveList}
                            />
                            <Bar/>
                            <Select
                                ref={searchRef}
                                title="삭제여부"
                                name="delYn"
                                defaultValue=""
                                options={delYn}
                            />
                            <Bar/>
                            <Select
                                ref={searchRef}
                                title="업무구분"
                                name="workScCd"
                                defaultValue=""
                                options={workScCd}
                            />
                            <Bar/>
                            <li>
                                <button className="btn btn_blue_h46 pd35" type="button"
                                 onClick={() => retrieveList({ pageIndex: 1 })}>조회</button>
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
                        <Button className="btn btn_blue_h46 pd35" onClick={handleClickOpen}>등록</Button>
                    </div>
                    {/* <!--// 등록버튼 --> */}
                    
                    {/* <!--// 본문 --> */}
                </div>
            </div>
            {/* </div> */}

            {/* Modal */}
            <ModalPop open={open} setOpen={setOpen} title="메시지 등록/수정" width="1000">
                <SysMessageDetailModal
                    setOpen={setOpen}
                    messageDetail={messageDetail}
                    getMessageHandler={() => retrieveList()}
                />
            </ModalPop>
            {/* Modal */}
        </div>
    );
}

export default SysMessageList;