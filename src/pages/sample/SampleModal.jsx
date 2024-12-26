import Button from 'components/basic/Button';
import React, { useState, useEffect, useRef } from 'react';

function SampleModal({ setOpen, sendData, handler }){
    console.log(sendData);
    
    const register = () => {

        // 저장하러 서버 갔다 오고
        console.log("저장하러 서버 갔다 오고");

        setOpen(false);
        handler();
    }
    return (
        <div className="btn_area">
            <Button className="btn btn_skyblue_h46 w_100" onClick={() => register()}>저장</Button>
            <Button className="btn btn_skyblue_h46 w_100" onClick={() => setOpen(false)}>닫기</Button>
        </div>
    )
}
export default SampleModal;