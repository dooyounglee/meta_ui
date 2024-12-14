import { forwardRef } from 'react';

function RowFormTextarea({ type,
        title, id, name, placeholder,
        defaultValue, value, onChange,
        list, // radio, checkbox, select
        checkedValue, checked, // radio, checkbox
        rows, cols, // textarea
        mode, height, // editor
        selected, keyStartDate, keyEndDate, startDate, endDate, handlerChange, // calender~
        // selectCallback, onKeyDownCallback, reset, selectMe, // chooseUser
        keyUsrNo, keyUsrNm, usrNo, usrNm, // findUser
        readOnly, disabled, required,
        onKeyDown
    }, ref) {
    return (
        <dl>
            <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
                <textarea className="f_txtar w_full"
                    name={name} placeholder={placeholder}
                    cols={cols} rows={rows}
                    ref={el => ref.current && (ref.current[name] = el)}
                    defaultValue={defaultValue}
                    readOnly={!!readOnly}
                    disabled={!!disabled}
                />
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormTextarea);