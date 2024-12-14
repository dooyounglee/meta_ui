import { forwardRef } from 'react';

function RowFormInputText({ type,
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
                <input className="f_input2 w_full" type="text"
                    name={name} placeholder={placeholder}
                    defaultValue={defaultValue}
                    ref={el => ref.current && (ref.current[name] = el)}
                    onChange={onChange || ((e) => {
                        ref.current[name].value = e.target.value;
                    })}
                    readOnly={!!readOnly}
                    disabled={!!disabled}
                    required={!!required}
                    autoComplete='off'
                />
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormInputText);