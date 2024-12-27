import React, { useCallback, useRef } from 'react';

import * as util from 'js/utils';
import Button from 'components/basic/Button';
import RowFormInputText from 'components/row/RowFormInputText';
import RowFormInputRadio from 'components/row/RowFormInputRadio';

const SysMessageDetailModal = ({ messageDetail, setOpen, getMessageHandler }) => {
    const messageRef = useRef({});

    // 공통코드
    const delYn = [{ value: "Y", label: "삭제" }, { value: "N", label: "미삭제" }];

    const register = useCallback((messageDetail, setOpen, getMessageHandler) => {

        // 필수체크
        if (!util.Validate.requiredNode(messageRef)) return false;

        // CMM-001: 저장하시겠습니까?
        if(!util.Message.confirm("CMM-001")) return false;

        const retrieveListURL = '/sys/message/save';
        const requestOptions = {
            method: messageDetail.msgId ? "PUT" : "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...messageDetail, ...util.Etc.getValuesFromRef(messageRef) })
        }

        util.Fetch.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                setOpen(false);
                getMessageHandler();
            }
        );
    },[]);

    return (<>
        <div className="board_view2">
            <RowFormInputText title="메시지코드"
                name="msgCd"
                placeholder="XXX-000"
                ref={messageRef}
                defaultValue={messageDetail.msgCd}
                required={true}
                readOnly={messageDetail.msgId}
            />
            <RowFormInputText title="메시지내용"
                name="msgCn"
                ref={messageRef}
                defaultValue={messageDetail.msgCn}
                required={true}
            />
            <RowFormInputRadio title="삭제여부"
                name="delYn"
                ref={messageRef}
                checkedValue={messageDetail.delYn}
                required={true}
                options={delYn}
            />
        </div>
        {/* <!-- 버튼영역 --> */}
        <div className="btn_area">
            <Button className="btn btn_skyblue_h46 w_100" onClick={() => register(messageDetail, setOpen, getMessageHandler)}>저장</Button>
            <Button className="btn btn_skyblue_h46 w_100" onClick={() => setOpen(false)}>닫기</Button>
        </div>
        {/* <!--// 버튼영역 --> */}
    </>)
}

export default SysMessageDetailModal;