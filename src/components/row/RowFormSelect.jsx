import { forwardRef } from 'react';

import * as util from 'js/utils';

function RowFormTextarea({ type,
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
        onKeyDown
    }, ref) {

        // 필수값 세팅
        util.Validate.setRequired(required, ref, title, name);

    return (
        <dl>
            <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
                <label className="f_select w_150" htmlFor="sel1">
                    <select
                        ref={el => {
                            ref.current[name] = el;
                        }}
                        defaultValue={defaultValue}
                        onChange={e => {
                            ref.current[name].value = e.target.value; 
                        }}
                        readOnly={readOnly}
                        disabled={disabled}
                    >
                        {options.map((option, i) => {
                            return (
                                <option key={i} value={option.value}>{option.label}</option>
                            )
                        })}
                    </select>
                </label>
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormTextarea);