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
                {list.map((item, i) => {
                    const checked = item.value === (ref.current[name]?.value || checkedValue);
                    const toggledClassName = checked ? "f_rdo on" : "f_rdo"
                    return (
                        <label className={toggledClassName} key={i}>
                            <input
                                type="radio"
                                name={name}
                                value={item.value}
                                title={item.label}
                                checked={checked}
                                ref={el => checked && (ref.current[name] = el)}
                                onClick={onChange || (e => {
                                    ref.current[name] = e.target;
                                    // setRadioValue(e.target.value)
                                })}
                                onChange={e => {
                                    ref.current[name] = e.target;
                                }}
                                readOnly={readOnly}
                                disabled={disabled}
                                required={required}
                            />
                            <em>{item.label}</em>
                        </label>)
                })}
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormInputText);