import React, { forwardRef } from 'react';

const Select = ({ name, title
                , options, defaultValue
                , readOnly, disabled }, ref) => {
    
    return (
        <li className="third_1 L">
            <span className="lb">{title}</span>
            <label className="f_select w_150" htmlFor="sel1">
                <select
                    ref={el => {
                        el.value = defaultValue;
                        ref.current[name] = el;
                    }}
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
        </li>
    );
}

export default forwardRef(Select);