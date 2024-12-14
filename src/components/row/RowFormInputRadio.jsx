import { forwardRef } from 'react';

function RowFormInputRadio({ type,
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
    return (
        <dl>
            <dt><label htmlFor={id}>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
                {options.map((radioOption, i) => {
                    const checked = radioOption.value === checkedValue;
                    const toggledClassName = checked ? "f_rdo on" : "f_rdo"
                    return (
                        <label className={toggledClassName} key={i}>
                            <input key={i}
                                type="radio"
                                name={name}
                                value={radioOption.value}
                                title={radioOption.label}
                                ref={el => checked && (ref.current[name] = el)}
                                checked={checked}
                                onChange={onChange || ((e) => {
                                    ref.current[name] = e.target
                                })}
                                readOnly={readOnly}
                                disabled={disabled}
                            />
                            <em>{radioOption.label}</em>
                        </label>
                    )
                })}
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormInputRadio);