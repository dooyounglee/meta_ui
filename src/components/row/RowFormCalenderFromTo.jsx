import { useState, forwardRef, useEffect } from 'react';

import DatePicker from "react-datepicker";

import * as util from 'js/utils';

function RowFormCalenderFromTo({ type,
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

        const [calender, setCalender] = useState({ startDate: startDate === undefined ? new Date() : util.Date.format(startDate, "YYYYMMDD"),
            endDate: endDate === undefined ? new Date() : util.Date.format(endDate, "YYYYMMDD") });
        
        // 필수값 세팅
        util.Validate.setRequired(required, ref, title + "_시작일자", keyStartDate);
        util.Validate.setRequired(required, ref, title + "_종료일자", keyEndDate);
        
        useEffect(() => {
            ref.current[keyStartDate] = {};
            ref.current[keyEndDate] = {};
            if (startDate && endDate) {
                ref.current[keyStartDate].value = startDate
                ref.current[keyEndDate].value = endDate
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
                            const [start, end] = dates;
                            // console.log(util.Date.format(start, "YYYYMMDD"))
                            // console.log(util.Date.format(end, "YYYYMMDD"))
                            try {
                                if (end == null) {

                                    // setCalender({ ...calender, startDate: start, endDate: null })
                                    ref.current[keyStartDate].value=util.Date.format(start, "YYYYMMDD");
                                    ref.current[keyEndDate].value="";
                                } else {
                                    // setCalender({ ...calender, endDate: end })
                                    ref.current[keyEndDate].value=util.Date.format(end, "YYYYMMDD");
                                }
                                setCalender({ ...calender, startDate: start, endDate: end })
                                handlerChange(dates);
                            } catch (e) {
                                console.log(e)
                            }
                            })}
                    startDate={calender.startDate}
                    endDate={calender.endDate}
                    selectsRange
                    inline
                />
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormCalenderFromTo);