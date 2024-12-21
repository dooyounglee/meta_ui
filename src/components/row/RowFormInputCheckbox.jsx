import { forwardRef } from 'react';

import * as util from 'js/utils';

const RowFormInputCheckbox = ({ type,
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
    }, ref) => {

        // 필수값 세팅
        util.Validate.setRequired(required, ref, title, name);

        ref.current[name] = {};
        ref.current[name].value = defaultValue;

    return (
        <dl>
            <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
            <li className="third_1 L">
                    <div className="chk" name={name}>
                        {list.map((item, index) => {
                            const checked = defaultValue && defaultValue.length > 0 ? defaultValue.indexOf(item.value) > -1 : false;
                            ; // true;
                            const toggledClassName = checked ? "f_chk on" : "f_chk"
                            return (
                            <label key={index} className={toggledClassName} htmlFor={index}>
                                <input type="checkbox" name={item.key} id={index}
                                    defaultChecked={checked}
                                    value={item.value}
                                    onChange={(e) => {
                                        console.log(e.target)
                                        console.log(e.target.value)
                                        var temp = ref.current[name].value || [];
                                        console.log(temp)
                                        var idx = temp.indexOf(e.target.value);
                                        if (idx === -1) {
                                            temp.push(e.target.value);
                                        } else {
                                            temp.splice(idx,1);
                                        }
                                        ref.current[name].value = temp;
                                }}/> <em>{item.label}</em>
                            </label>
                        )})}
                    </div>
                </li>
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormInputCheckbox);