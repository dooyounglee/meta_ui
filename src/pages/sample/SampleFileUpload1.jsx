import React, { useRef, useState } from 'react';

import * as util from 'js/utils';
import Button from 'components/basic/Button';
import RowFormFileUpload from 'components/row/RowFormFileUpload';
import RowFormInputText from 'components/row/RowFormInputText';
import RowFormValue from 'components/row/RowFormValue';

const SampleFileUpload1 = () => {
    const [new_files1, setNewFiles1] = useState([]);
    const [del_files1, setDelFiles1] = useState([]);
    const [web_files1, setWebFiles1] = useState([]);
    const [atchFileDetail1, setAtchFileDetail1] = useState({});

    const [new_files2, setNewFiles2] = useState([]);
    const [del_files2, setDelFiles2] = useState([]);
    const [web_files2, setWebFiles2] = useState([]);
    const inputRef2 = useRef({});

    const [web_files3, setWebFiles3] = useState([]);
    const inputRef3 = useRef({});

    const fileupload1 = () => {
        const formData = new FormData();

        // formData에 file담기
        for (let file of new_files1) { formData.append("new_files", file); }
        for (let file of del_files1) { formData.append("del_files", file); }
        for (let file of web_files1) {
            formData.append("web_files", file.atchFileId > 0 ? [file.atchFileId,file.fileSn].join(",") : file);
        }

        // // 파일 외에 보내야 할 dataset,datamap도 formData에 담기
        // var obj = util.Etc.getValuesFromRef(inputRef1);console.log(obj)
        // for (let key in obj) {
        //     formData.append(key, obj[key]);
        // }

        const retrieveListURL = '/cmm/file/upload';
        const requestOptions = {
            method: "POST",
            headers: {},
            body: formData
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setNewFiles1([]);
                setDelFiles1([]);
                setWebFiles1([]); // setWebFiles1(resp);
                if (resp.length > 0) {
                    // inputRef1.current["atchFileId"].value = resp[0].atchFileId;
                    setAtchFileDetail1({atchFileId: resp[0].atchFileId});
                }
            }
        );
    }

    const fileupload2 = () => {
        const formData = new FormData();

        // formData에 file담기
        for (let file of new_files2) { formData.append("new_files", file); }
        for (let file of del_files2) { formData.append("del_files", file); }
        for (let file of web_files2) {
            formData.append("web_files", file.atchFileId > 0 ? [file.atchFileId,file.fileSn].join(",") : file);
        }

        // // 파일 외에 보내야 할 dataset,datamap도 formData에 담기
        var obj = util.Etc.getValuesFromRef(inputRef2);
        for (let key in obj) {
            formData.append(key, obj[key]);
        }

        const retrieveListURL = '/cmm/file/upload?c=C&d=D';
        const requestOptions = {
            method: "POST",
            headers: {},
            body: formData
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setNewFiles2([]);
                setDelFiles2([]);
                setWebFiles2(resp);
            }
        );
    }

    const filelist2 = () => {
        const retrieveListURL = '/cmm/file/list';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(util.Etc.getValuesFromRef(inputRef2)),
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setWebFiles2(resp);
            }
        );
    }

    const filelist3 = () => {
        const retrieveListURL = '/cmm/file/list';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(util.Etc.getValuesFromRef(inputRef3)),
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setWebFiles3(resp);
            }
        );
    }

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
                    <div className="contents QNA_LIST" id="contents">
                        {/* <!-- 본문 --> */}
                        <div className="top_tit">
                            <h1 className="tit_1">첨부파일1</h1>                            
                        </div>
                        <h2 className="tit_2">첨부파일1</h2>
                        <div className="board_view2">
                            <RowFormFileUpload title="파일등록"
                                new_files={new_files1}
                                del_files={del_files1}
                                web_files={web_files1}
                                setNewFiles={setNewFiles1}
                                setDelFiles={setDelFiles1}
                                setWebFiles={setWebFiles1}
                                mode="create" 
                                posblAtchFileNumber = "100"
                            />
                            <RowFormValue title="atchFileId"
                                value={atchFileDetail1.atchFileId}
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={fileupload1}>저장</Button>
                            <dl><dd></dd></dl>
                            <RowFormFileUpload title="파일수정"
                                new_files={new_files2}
                                del_files={del_files2}
                                web_files={web_files2}
                                setNewFiles={setNewFiles2}
                                setDelFiles={setDelFiles2}
                                setWebFiles={setWebFiles2}
                                mode="modify" 
                                posblAtchFileNumber = "100"
                            />
                            <RowFormInputText title="atchFileId"
                                name="atchFileId"
                                ref={inputRef2}
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={fileupload2}>저장</Button>
                            <Button className="btn btn_success_h46 w_100" onClick={filelist2}>조회</Button>
                            <dl><dd></dd></dl>
                            <RowFormFileUpload title="파일조회"
                                web_files={web_files3}
                            />
                            <RowFormInputText title="atchFileId"
                                name="atchFileId"
                                ref={inputRef3}
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={filelist3}>조회</Button>
                        </div>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SampleFileUpload1;