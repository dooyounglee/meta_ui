import React, { useEffect } from 'react';

const ModalPop = (props) => {
    const handleClose = () => {
        props.setOpen(false);
    }

    // 모달 open시, scroll동작 막기
    useEffect(() => {

        // scroll 있는상태/없는상태 구분하기 위한 높이 값
        // overflow:hidden으로 처리했을 경우, 이미 scroll있는 화면에서 모달open시, width가 늘어남
        // 그렇다고 overflow-y:scroll로 했으면 반대로, scroll없는 화면에서 width가 줄어듬
        let scrollHeight = document.documentElement.scrollHeight; // 총 스크롤 높이
        let clientHeight = document.documentElement.clientHeight; // 브라우저 창 높이
        
        let scrollY = window.scrollY;
        let innerHeight = window.innerHeight;

        if (props.open) {
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            ${scrollHeight > clientHeight ? 'overflow-y: scroll;' : ''}
            width: 100%;`;

            var $modal = document.querySelector('.pop_inner');
            $modal.style.top = (scrollY + (innerHeight - 0) / 2) + "px";
        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    }, [props.open]);

    return (
        props.open &&
        <div className="modal">
            <div className="pop_inner">
                <div className="pop_header">
                    <h1>{props.title}</h1>
                    <button className="btn close" type="button" onClick={handleClose}>닫기</button>
                </div>
                <div className="pop_container" style={{width: props.width+'px'}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
export default ModalPop;