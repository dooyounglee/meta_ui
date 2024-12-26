import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import * as util from 'js/utils'

// Toast 에디터
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import RowFormEditor from 'components/row/RowFormEditor';
import RowFormInputText from 'components/row/RowFormInputText';

function SampleEditor1() {
    
	const checkRef1 = useRef([]);
    const checkRef2 = useRef([]);
    const editorRef1 = useRef({});
    const editorRef2 = useRef({});
    const editorRef3 = useRef({});

    const [boardDetail1, setBoardDetail1] = useState({});
    const [content1, setContent1] = useState();
    const [boardDetail2, setBoardDetail2] = useState({});
    const [content2, setContent2] = useState();
    const [boardDetail3, setBoardDetail3] = useState({}); // 초기값 설정안함
    const [content3, setContent3] = useState(); // 초기값 설정안함

    const onChange1 = () => {
        setContent1(editorRef1.current?.getInstance().getHTML())
    }
    const onChange2 = () => {
        setContent2(editorRef2.current?.getInstance().getHTML())
    }

    const load2 = () => {
        setBoardDetail2({title:'load_Title2'})
        setContent2('<p>load_Content2</p>')
    }
    const load3 = () => {
        setBoardDetail3({title:'load_Title3'})
        setContent3('<p>1231<span style=\"color: #ab4642\">2313</span>13213</p>')
    }

    const checkRequired1 = () => {
        alert(util.Validate.requiredNode(editorRef1));
    }
    const checkRequired2 = () => {
        alert(util.Validate.requiredNode(editorRef2));
    }

    const save1 = () => {
        console.log(util.Etc.getValuesFromRef(editorRef1));
    }

    const save2 = () => {
        console.log(util.Etc.getValuesFromRef(editorRef2));
    }

    const reset1 = () => {
        console.log("reset1")
        setBoardDetail1({})
        setContent1('')
    }
    const reset2 = () => {
        console.log("reset2")
        setBoardDetail2({})
        setContent2('')
    }

    useEffect(() => {
        load2();
        load3();
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
                            {/* <PmsRowInput label="게시판명" isReq="true"
                                id="title" name="title" placeholder="please"
                                obj={boardDetail1}
                                onChange={setBoardDetail1}
                                ref={checkRef}
                                refOrder="0"
                            />
                            <dl>
                                <dt>게시판 유형1<span className="req">필수</span></dt>
                                <dd>
                                    <Editor
                                        initialValue={boardDetail1.content || ' '}
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical" // 미리보기 스타일 지정
                                        height="300px" // 에디터 창 높이
                                        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                                        toolbarItems={[
                                            // 툴바 옵션 설정
                                            ['heading', 'bold', 'italic', 'strike'],
                                            ['hr', 'quote'],
                                            ['ul', 'ol', 'task', 'indent', 'outdent'],
                                            ['table', 'image', 'link'],
                                            ['code', 'codeblock']
                                        ]}
                                        plugins={[colorSyntax]}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>조회용<span className="req">필수</span></dt>
                                <dd>
                                    {boardDetail1.content && (
                                    <Viewer initialValue={boardDetail1.content || '<p>fdsafudhsafkdsaikfdjif</p>'} />
                                    )}
                                </dd>
                            </dl> */}
                            {/* <PmsRowInput label="새글제목" isReq="true"
                                id="title" name="title" placeholder="please"
                                obj={boardDetail1}
                                onChange={setBoardDetail1}
                                ref={checkRef1}
                                refOrder="0"
                            /> */}
                            <RowFormInputText title="새글제목"
                                name="title" placeholder="please"
                                ref={editorRef1}
                                required={true}
                            />
                            <RowFormEditor title="새글내용"
                                name="editor" placeholder="내용을 입력해 주세요."
                                mode="create" height="300px"
                                ref={editorRef1}
                                value=" "
                            />
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => save1()}>저장</button>
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => checkRequired1()}>필수체크</button>
                                </div>

                                <div className="right_col btn1">
                                    <button className="btn btn_blue_h46 w_100" onClick={reset1}>새글</button>
                                </div>
                            </div>
                            {/* <PmsRowInput label="수정제목" isReq="true"
                                id="title" name="title" placeholder="please"
                                obj={boardDetail2}
                                onChange={setBoardDetail2}
                                ref={checkRef2}
                                refOrder="0"
                            /> */}
                            <RowFormInputText title="수정제목"
                                name="title" placeholder="please"
                                ref={editorRef2}
                                required={true}
                                defaultValue="load_title"
                            />
                            <RowFormEditor title="수정내용"
                                name="editor" placeholder="내용을 입력해 주세요."
                                mode="modify" height="300px"
                                ref={editorRef2}
                                value={content2}
                            />
                            <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => save2()}>저장</button>
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => checkRequired2()}>필수체크</button>
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => load2()}>불러오기</button>
                                </div>

                                <div className="right_col btn1">
                                    <button className="btn btn_blue_h46 w_100" onClick={reset2}>새글</button>
                                </div>
                            </div>
                            {/* <PmsRowInput label="조회제목" isReq="true"
                                id="title" name="title" placeholder="please"
                                obj={boardDetail3}
                                onChange={setBoardDetail3}
                                readOnly="true"
                            /> */}
                            <RowFormInputText title="조회제목"
                                name="title" placeholder="please"
                                ref={editorRef3}
                                required={true}
                                readOnly={true}
                                defaultValue="load_title"
                            />
                            <RowFormEditor title="조회내용"
                                mode="read"
                                value={content3}
                            />

                            {/* <!-- 버튼영역 --> */}
                            {/* <div className="board_btn_area">
                                <div className="left_col btn1">
                                    <button className="btn btn_skyblue_h46 w_100"
                                        onClick={() => load3()}>불러오기</button>
                                </div>
                            </div> */}
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

export default SampleEditor1;