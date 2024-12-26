import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import URL from 'constants/url';
import CODE from 'constants/code';

import * as util from 'js/utils';
import RowFormInputText from 'components/row/RowFormInputText';
import RowFormTextarea from 'components/row/RowFormTextarea';
import RowFormSelect from 'components/row/RowFormSelect';
import RowFormInputRadio from 'components/row/RowFormInputRadio';
import RowFormInputNumber from 'components/row/RowFormInputNumber';
import RowFormInputColor from 'components/row/RowFormInputColor';
import RowFormEditor from 'components/row/RowFormEditor';
import RowFormCalender from 'components/row/RowFormCalender';
import RowFormCalenderFromTo from 'components/row/RowFormCalenderFromTo';
import RowFormInputCheckbox from 'components/row/RowFormInputCheckbox';
import RowFormInputPassword from 'components/row/RowFormInputPassword';

function SampleCreate1(props) {
    const inputRef = useRef({});

    const replyPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const fileAtchPosblAtRadioGroup = [{ value: "Y", label: "가능" }, { value: "N", label: "불가능" }];
    const bbsTyCodeOptions = [{ value: "", label: "선택" }, { value: "BBST01", label: "일반게시판" }, { value: "BBST03", label: "공지게시판" }];
    const bbsAttrbCodeOptions = [{ value: "", label: "선택" }, { value: "BBSA02", label: "갤러리" }, { value: "BBSA03", label: "일반게시판" }];
    const posblAtchFileNumberOptions = [{ value: 0, label: "선택하세요" }, { value: 1, label: "1개" }, { value: 2, label: "2개" }, { value: 3, label: "3개" }];
    const delYn = [{ value: "Y", label: "삭제" }, { value: "N", label: "미삭제" }];

    const updateBoard = () => {
        console.log(util.Etc.getValuesFromRef(inputRef));
    };

    const getSelectedLabel = (objArray, findLabel = "") => {
        let foundValueLabelObj = objArray.find(o => o['value'] === findLabel);
        return foundValueLabelObj['label'];
    }

    const checkRequired = () => {
        alert(util.Validate.requiredNode(inputRef));
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

                        <h2 className="tit_2">등록화면1</h2>

                        {/* <!-- 상세 --> */}
                        <div className="board_view2">
                            <RowFormInputText title="게시판명"
                                name="bbsNm" placeholder="placeholder는 여기에 쓰세요"
                                ref={inputRef}
                                required={true}
                            />
                            <RowFormTextarea title="게시판 소개"
                                name="bbsIntrcn" placeholder="placeholder는 여기에 쓰세요"
                                rows="10"
                                ref={inputRef}
                                required={true}
                            />
                            <RowFormEditor title="게시판 editor"
                                name="bbsEditor" placeholder="placeholder는 여기에 쓰세요"
                                mode="create" height="200px"
                                ref={inputRef}
                                value=" "
                                required={true}
                            />
                            <RowFormSelect title="게시판유형선택"
                                name="bbsTyCode"
                                options={bbsTyCodeOptions}
                                ref={inputRef}
                                defaultValue="BBST01"
                                required={true}
                            />
                            <RowFormInputCheckbox title="체크박스"
                                name="check"
                                list={bbsTyCodeOptions}
                                ref={inputRef}
                                defaultValue={["BBST03"]}
                                required={true}
                            />
                            <dl>
                                <dt>게시판 유형2<span className="req">필수</span></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    <span>
                                        {"BBST01" && getSelectedLabel(bbsTyCodeOptions, "BBST01")}
                                    </span>
                                </dd>
                            </dl>
                            <RowFormInputRadio title="삭제여부"
                                name="delYn"
                                options={delYn}
                                ref={inputRef}
                                required={true}
                                checkedValue="Y"
                            />
                            <dl>
                                <dt>답장가능여부2<span className="req">필수</span></dt>
                                <dd>
                                    {/* 수정/조회 일때 변경 불가 */}
                                    <span>
                                        {"Y" && getSelectedLabel(replyPosblAtRadioGroup, "Y")}
                                    </span>
                                </dd>
                            </dl>
                            <RowFormInputNumber title="게시판수"
                                name="bbsCnt" placeholder="placeholder는 여기에 쓰세요"
                                ref={inputRef}
                                required={true}
                            />
                            <RowFormInputColor title="게시판색깔"
                                name="bbsColor" placeholder="placeholder는 여기에 쓰세요"
                                ref={inputRef}
                                required={true}
                            />
                            <RowFormCalender title="일정"
                                keyStartDate="selectedDate" //startDate={boardDetail.startDate}
                                // keyEndDate="endDate" //endDate={boardDetail.endDate}
                                //selected={boardDetail.startDate}
                                required={true}
                                handlerChange={(start) => {
                                    // valueRef.current["startDate"].value = start;
                                    // valueRef.current["endDate"].value = end;
                                }}
                                ref={inputRef}
                            />
                            <RowFormCalenderFromTo title="범위"
                                keyStartDate="startDate" //startDate={boardDetail.startDate}
                                keyEndDate="endDate" //endDate={boardDetail.endDate}
                                //selected={boardDetail.startDate}
                                required={true}
                                handlerChange={([start,end]) => {
                                    // valueRef.current["startDate"].value = start;
                                    // valueRef.current["endDate"].value = end;
                                }}
                                ref={inputRef}
                            />
                            <RowFormInputPassword title="비밀번호"
                                name="password" placeholder="placeholder는 여기에 쓰세요"
                                ref={inputRef}
                                required={true}
                            />

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => updateBoard()}>저장</button>
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => checkRequired()}>필수체크</button>
                                </div>

                                <div className="right_col btn1">
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