import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { default as EgovLeftNav } from 'pms_components/leftmenu/LeftNavExample';
import URL from 'constants/url';
import CODE from 'constants/code';
import * as util from 'js/utils';
import ModalPop from 'components/layout/ModalPop';
import SampleModal from './SampleModal';

function SampleModal1(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };
    const navigate = useNavigate();
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
    
    useEffect(() => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            {/* <div className="c_wrap"> */}
                {/* <!-- Location --> */}
                {/* <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.ADMIN}>사이트관리</Link></li>
                        <li>사이트관리자 암호변경</li>
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
                            <h1 className="tit_1">Modal1</h1>
                        </div>
                            <h2 className="tit_2">Modal</h2>
                        <div className="board_view2">
                            <dl>
                                <dt><label htmlFor="modal">모달</label></dt>
                                <dd>
                                    <button className="btn btn_skyblue_h46" onClick={handleClickOpen}>
                                        Open simple dialog
                                    </button>
                                </dd>
                            </dl>
                        </div>
                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            {/* </div> */}
            <ModalPop open={open} setOpen={setOpen} title="모달창 제목" width="1000">
                <SampleModal
                    setOpen={setOpen}
                    sendData={{"A": "a", "B": "b"}}
                    handler={() => console.log("저장 후 부모 event(ex.재조회) 호출")}
                />
            </ModalPop>
        </div>
    );
}
export default SampleModal1;