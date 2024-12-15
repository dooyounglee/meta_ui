import { useState, forwardRef, useEffect } from 'react';

import DatePicker from "react-datepicker";

import * as util from 'js/utils';

function RowFormCalender({ type,
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

        const [calender, setCalender] = useState({ startDate: startDate === undefined ? new Date() : util.Date.format(startDate, "YYYYMMDD") });
        
        if (!ref.current[keyStartDate]) ref.current[keyStartDate] = {};
        if (startDate) {
            ref.current[keyStartDate].value = startDate
        }
        
        // 필수값 세팅
        util.Validate.setRequired(required, ref, title, keyStartDate);
        
        useEffect(() => {
            ref.current[keyStartDate] = {};
            if (startDate) {
                ref.current[keyStartDate].value = startDate
            }
        }, []);
    return (
        <dl>
            <dt><label>{title}</label>{required && <span className="req">필수</span>}</dt>
            <dd>
                <DatePicker
                    selected={calender.startDate}
                    onChange={onChange !== undefined ? (dates => onChange(dates)) :
                            (dates => {
                            const start = dates;
                            try {
                                ref.current[keyStartDate].value=util.Date.format(start, "YYYYMMDD");
                                setCalender({ ...calender, startDate: start })
                                handlerChange(dates);
                            } catch (e) {
                                console.log(e)
                            }
                            })}
                    startDate={calender.startDate}
                    inline
                />
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormCalender);