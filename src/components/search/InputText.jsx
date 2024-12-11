import React, { forwardRef } from 'react';

const InputText = ({ name, title, width
                   , defaultValue
                   , readOnly, disabled, onSearch }, ref) => {
    
    return (
        <li className="third_2 R">
            <span className="lb">{title}</span>
            <span className={`f_search ${width}`}>
                <input type="text"
                    ref={el => {
                        el.value = defaultValue || "";
                        ref.current[name] = el;
                    }}
                    onChange={e => {
                        ref.current[name].value = e.target.value; 
                    }}
                    readOnly={readOnly}
                    disabled={disabled}
                />
                <button type="button" onClick={onSearch}>조회</button>
                </span>
        </li>
    );
}

export default forwardRef(InputText);