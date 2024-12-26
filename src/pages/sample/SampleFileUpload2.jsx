import React, { useState, useRef } from 'react';

import * as util from 'js/utils'
import Button from 'components/basic/Button';
import RowFormFileDragDrop from 'components/row/RowFormFileDragDrop';
import RowFormInputText from 'components/row/RowFormInputText';
import RowFormValue from 'components/row/RowFormValue';

const SampleFileUpload2 = () => {
    const [new_files1, setNewFiles1] = useState([]);
    const [del_files1, setDelFiles1] = useState([]);
    const [web_files1, setWebFiles1] = useState([]);
    const [atchFileDetail1, setAtchFileDetail1] = useState({});

    const [new_files2, setNewFiles2] = useState([]);
    const [del_files2, setDelFiles2] = useState([]);
    const [web_files2, setWebFiles2] = useState([]);
    const fileRef2 = useRef({});

    const [web_files3, setWebFiles3] = useState([]);
    const fileRef3 = useRef({});

    const [new_files4, setNewFiles4] = useState([]);
    const [del_files4, setDelFiles4] = useState([]);
    const [web_files4, setWebFiles4] = useState([]);
    const [atchFileDetail4, setAtchFileDetail4] = useState({});
    const fileRef4 = useRef({});

    const [new_files5, setNewFiles5] = useState([]);
    const [del_files5, setDelFiles5] = useState([]);
    const [web_files5, setWebFiles5] = useState([]);

    const fileupload1 = () => {
        const formData = new FormData();

        // formData에 file담기
        for (let file of new_files1) { formData.append("new_files", file); }
        for (let file of del_files1) { formData.append("del_files", file); }
        for (let file of web_files1) {
            formData.append("web_files", file.atchFileId > 0 ? [file.atchFileId,file.fileSn].join(",") : file);
        }

        // // 파일 외에 보내야 할 dataset,datamap도 formData에 담기
        // for (let key in atchFileDetailUpload) {
        //     formData.append(key, atchFileDetailUpload[key]);
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
        var obj = util.Etc.getValuesFromRef(fileRef2);
        for (let key in obj) {
            formData.append(key, obj[key]);
        }

        const retrieveListURL = '/cmm/file/upload';
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
            body: JSON.stringify(util.Etc.getValuesFromRef(fileRef2)),
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
            body: JSON.stringify(util.Etc.getValuesFromRef(fileRef3)),
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setWebFiles3(resp);
            }
        );
    }

    const filelist4 = () => {
        const retrieveListURL = '/cmm/file/list';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(util.Etc.getValuesFromRef(fileRef4)),
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setNewFiles4([...resp]); // 파일복사용도
                setWebFiles4(resp);
            }
        );
    }

    const filecopy4 = () => {
        const formData = new FormData();

        // formData에 file담기
        for (let file of new_files4) {
            formData.append("new_files", file.atchFileId > 0 ? [file.atchFileId,file.fileSn].join(",") : file);
        }
        for (let file of del_files4) { formData.append("del_files", file); }
        for (let file of web_files4) {
            formData.append("web_files", file.atchFileId > 0 ? [file.atchFileId,file.fileSn].join(",") : file);
        }

        // // 파일 외에 보내야 할 dataset,datamap도 formData에 담기
        // for (let key in atchFileDetailUpload) {
        //     formData.append(key, atchFileDetailUpload[key]);
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
                setNewFiles4([]);
                setDelFiles4([]);
                setWebFiles4(resp);
                if (resp.length > 0) {
                    setAtchFileDetail4({newAtchFileId:resp[0].atchFileId});
                }
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
                            <h1 className="tit_1">첨부파일2</h1>                            
                        </div>
                        <h2 className="tit_2">첨부파일2</h2>
                        <div className="board_view2">
                            <RowFormFileDragDrop title="파일신규"
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
                            <RowFormFileDragDrop title="파일수정"
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
                                ref={fileRef2}
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={filelist2}>조회</Button>
                            <Button className="btn btn_success_h46 w_100" onClick={fileupload2}>저장</Button>
                            <dl><dd></dd></dl>
                            <RowFormFileDragDrop title="파일조회"
                                web_files={web_files3}
                            />
                            <RowFormInputText title="atchFileId"
                                name="atchFileId"
                                ref={fileRef3}
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={filelist3}>조회</Button>
                            <dl><dd></dd></dl>
                            <RowFormFileDragDrop title="파일??"
                                new_files={new_files4}
                                del_files={del_files4}
                                web_files={web_files4}
                                setNewFiles={setNewFiles4}
                                setDelFiles={setDelFiles4}
                                setWebFiles={setWebFiles4}
                                mode="modify" 
                                posblAtchFileNumber = "100"
                            />
                            <RowFormInputText title="atchFileId"
                                name="atchFileId"
                                ref={fileRef4}
                            />
                            {/* <PmsRowReadonly label="newAtchFileId" value={atchFileDetail4.newAtchFileId}/> */}
                            <RowFormValue title="newAtchFileId" value={atchFileDetail4.newAtchFileId} />

                            <RowFormFileDragDrop title="첨부파일new"
                                new_files={new_files5}
                                del_files={del_files5}
                                web_files={web_files5}
                                setNewFiles={setNewFiles5}
                                setDelFiles={setDelFiles5}
                                setWebFiles={setWebFiles5}
                                mode="modify"
                                posblAtchFileNumber="100"
                            />
                            <Button className="btn btn_success_h46 w_100" onClick={filelist4}>조회</Button>
                            <Button className="btn btn_success_h46 w_100" onClick={filecopy4}>복사</Button>
                        </div>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}

export default SampleFileUpload2;