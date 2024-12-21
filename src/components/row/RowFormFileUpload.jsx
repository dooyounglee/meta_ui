import React, { useState, useEffect, useCallback, useRef } from 'react';

import { SERVER_URL } from 'config';
import CODE from 'constants/code';

function RowFormFileUpload({ title, mode, posblAtchFileNumber, new_files, del_files, web_files, setNewFiles, setDelFiles, setWebFiles }) {

    const [filesTag, setFilesTag] = useState([]);

    // posblAtchFileNumber는 수정일 경우에만 값이 넘어오므로 방어 로직
	// 해당 컴포넌트는 스케줄 화면과 공유하며, 스케줄에서는 첨부파일을 1개 넣을 수 있으므로 디폴트 값을 1로 설정
    if(typeof posblAtchFileNumber == "undefined" || posblAtchFileNumber == null) {
        posblAtchFileNumber = 100;
    }

    // 다운로드
    function onClickDownFile(atchFileId, fileSn) {
        window.open(SERVER_URL + "/cmm/file/download?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "", "hiddenframe");
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
            del_files.push([atchFileId,fileSn].join(","))
            setDelFiles(del_files);
            web_files.splice(fileIndex, 1);
            setWebFiles(web_files);
            renderFilesTag();
        }
    }

    function onChangeFileInput(e) {

        // 개수 넘으면 못올림
        if (e.target.files.length+(web_files?.length||0) > posblAtchFileNumber) {
		  alert('총 첨부파일 개수는 '+posblAtchFileNumber+' 까지 입니다.');
		  e.target.value = null; // 파일 입력란 화면 초기화
		  // fnChangeFile({}); // 상위 컴포넌트의 저장된 값 초기화
		  return false;
	    }

        // 중복체크
        var changeFiles = [];
        var duplicateFileNm = [];
        for (var file of e.target.files) {
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

        for ( let i = 0; i < changeFiles.length; i++) {
            new_files.push(changeFiles[i]);
            web_files.push(changeFiles[i]);
        }
        setNewFiles(new_files);
        setWebFiles(web_files);
        renderFilesTag();
    };

    function renderFilesTag() {
        var tempTag = [];
        if (web_files !== undefined) {
            web_files.forEach(function (item, index) {
                tempTag.push(
                    <React.Fragment key={index}>
                        <span>
                            <a  href={"#LINK"} onClick={function (e) {
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
                tempTag.push(<br key={["br", `${index}`].join(" ")}/>);
            });
        }
        setFilesTag(tempTag);
    }

    useEffect(() => {
        renderFilesTag()
    }, [web_files])

    return (
        <dl>
            <dt>{title}</dt>
            <dd>
                <span className="file_attach">
                    {(mode === CODE.MODE_CREATE) &&
						<>
						<input name="file_0" id="egovComFileUploader" type="file" multiple onChange={e => onChangeFileInput(e)}></input>
						총 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber-(filesTag.length/3)} / {posblAtchFileNumber} 개 입니다.<br></br>
						</>
					}
                    {/* 첨부파일 1개 당  filesTag는 3개 요소(span, button, br)를 가진다 */}
                    {(mode === CODE.MODE_MODIFY && (filesTag.length/3 < posblAtchFileNumber)) &&
						<> 
						<input name="file_1" id="egovComFileUploader" type="file" multiple onChange={e => onChangeFileInput(e)}></input>
						현재 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber-(filesTag.length/3)} 개 입니다.<br></br>
						</>
					}
                    {filesTag}
                </span>
                <iframe name='hiddenframe' style={{ display: "none", width: "0px", height: "0px" }}></iframe>
            </dd>
        </dl>
    );
}

export default React.memo(RowFormFileUpload);