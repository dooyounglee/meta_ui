import React, { useState, useEffect, useRef, forwardRef } from 'react';

import { SERVER_URL } from 'config';
import CODE from 'constants/code';
import fileDownImg from 'css/images/file_download.png';
import * as util from 'js/utils';

const RowFormFileDragDrop = ({ type,
        title, id, name, placeholder,
        defaultValue, value, onChange,
        list, options, // radio, checkbox, select
        checkedValue, checked, // radio, checkbox
        rows, cols, // textarea
        mode, height, // editor
        selected, keyStartDate, keyEndDate, startDate, endDate, handlerChange, // calender~
        // selectCallback, onKeyDownCallback, reset, selectMe, // chooseUser
        keyUsrNo, keyUsrNm, usrNo, usrNm, // findUser
        readOnly, disabled, required,
        onKeyDown,
        /*mode,*/ posblAtchFileNumber, new_files, del_files, web_files, setNewFiles, setDelFiles, setWebFiles // file
    }, ref) => {

        const fileRef = useRef(null);
        const [filesTag, setFilesTag] = useState([]);

        // 필수값 세팅
        // util.Validate.setRequired(required, ref, title, name);

        // posblAtchFileNumber는 수정일 경우에만 값이 넘어오므로 방어 로직
        // 해당 컴포넌트는 스케줄 화면과 공유하며, 스케줄에서는 첨부파일을 1개 넣을 수 있으므로 디폴트 값을 1로 설정
        if (typeof posblAtchFileNumber == "undefined" || posblAtchFileNumber == null) {
            posblAtchFileNumber = 100;
        }
    
        // 다운로드
        function onClickDownFile(atchFileId, fileSn) {
            window.open(SERVER_URL + "/api" + "/cmm/file/download?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "", "hiddenframe");
        }
    
        function onClickDeleteFile(atchFileId, fileSn, fileIndex) {
            console.log("onClickDeleteFile Params : ", atchFileId, fileSn, fileIndex);
            // 방금 추가한거였으면 new_files에서 제거
            if (atchFileId == null) {
                var filename = web_files[fileIndex].name;
                var newFileIndex = new_files.findIndex(o => o.name == filename);
                new_files.splice(newFileIndex, 1);
                setNewFiles(new_files);
                web_files.splice(fileIndex, 1);
                setWebFiles(web_files);
                renderFilesTag();
            } else {
                del_files.push([atchFileId, fileSn].join(","))
                setDelFiles(del_files);
                web_files.splice(fileIndex, 1);
                setWebFiles(web_files);
                renderFilesTag();
            }
        }
    
        function renderFilesTag() {
            var tempTag = [];
            if (web_files !== undefined) {
                web_files.forEach(function (item, index) {
                    tempTag.push(
                        <React.Fragment key={index}>
                            <span>
                                <a href={"#LINK"} onClick={function (e) {
                                    e.preventDefault();
                                    onClickDownFile(item.atchFileId, item.fileSn);
                                }} download>
                                    {item.name}
                                </a>
                                <span>
                                    [{item.size}byte]
                                </span>
                            </span>
                        </React.Fragment>
                    );
                    if (mode === CODE.MODE_CREATE || mode === CODE.MODE_MODIFY) {
                        tempTag.push(
                            <React.Fragment key={["button", `${index}`].join(" ")}>
                                <button className="btn btn_delete" onClick={(e) => {
                                    onClickDeleteFile(item.atchFileId, item.fileSn, index);
                                }}></button>
                            </React.Fragment>
                        );
                    }
                    tempTag.push(<br key={["br", `${index}`].join(" ")} />);
                });
            }
            setFilesTag(tempTag);
        }
    
        const setFilesOnChange = (files) => {
            // 개수 넘으면 못올림
            if (files.length + (web_files?.length || 0) > posblAtchFileNumber) {
                alert('총 첨부파일 개수는 ' + posblAtchFileNumber + ' 까지 입니다.');
                // e.target.value = null; // 파일 입력란 화면 초기화
                // fnChangeFile({}); // 상위 컴포넌트의 저장된 값 초기화
                return false;
            }
    
            // 중복체크
            var changeFiles = [];
            var duplicateFileNm = [];
            for (var file of files) {
                if (isDuplicateFile(file)) {
                    duplicateFileNm.push(file.name);
                    continue;
                } else {
                    changeFiles.push(file);
                }
            }
            if (duplicateFileNm.length > 0) {
                alert("다음 파일(들)이 중복됐어요\n" + duplicateFileNm.join("\n"));
            }
    
            function isDuplicateFile(file) {
                for (var web_file of web_files) {
                    if (file.name == web_file.name) {
                        return true;
                    }
                }
                return false;
            }
    
            for (let i = 0; i < changeFiles.length; i++) {
                new_files.push(changeFiles[i]);
                web_files.push(changeFiles[i]);
            }
            setNewFiles(new_files);
            setWebFiles(web_files);
            renderFilesTag();
        }
    
        const onInputFile = (e) => {
            e.preventDefault()
            setFilesOnChange(e.target.files);
        };
        const onDropFiles = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.remove('is-dragover');
            setFilesOnChange(e.dataTransfer.files);
        }
        // 없으면 drop 작동안함...
        const dragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('is-dragover')
        };
    
        const dragEnd = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.remove('is-dragover')
        };
    
    
    
    
        const onDoubleClick = () => {
            fileRef.current.click();
        }
    
        useEffect(() => {
            renderFilesTag()
        }, [web_files])
    
        return (
            <dl>
                <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
                <dd>
                    <div id="dlendud" style={{ position: 'relative', height: '200px'}} onDoubleClick={onDoubleClick}>
                        <div
                            id='box'
                            onDrop={onDropFiles}
                            onDragLeave={dragEnd}
                            onDragEnd={dragEnd}
                            onDragEnter={dragOver}
                            onDragOver={dragOver}
                            className={(filesTag.length > 0 ? 'child_dp_none ' : '') + 'div_images'}
                        >
                            <img draggable='false' src={fileDownImg} style={{height: '80px', width: '80px', marginBottom: '20px' }} />
                            <label htmlFor="input_file" className='input_label'>
                                <strong>Choose a file</strong>
                                <span> or drag it here</span>.
                            </label>
                        </div>
                        <input id="input_file" type="file" ref={fileRef} multiple onChange={onInputFile} />
                        {filesTag.length > 0 &&
                            <div className="file_attach" style={{ position: 'absolute', top: '0px', margin: '20px', width:'94%' ,height :'82%', overflow:'auto', zIndex:1 }}>
                                {filesTag}
                            </div>}
                    </div>
                    <iframe name='hiddenframe' style={{ display: "none", width: "0px", height: "0px" }}></iframe>
                </dd>
            </dl>
        );
}

export default forwardRef(RowFormFileDragDrop);