import { forwardRef } from 'react';

import * as util from 'js/utils';

function RowFormValue({ type,
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
            <dt><label>{title}</label></dt>
            <dd>
                {value}
            </dd>
        </dl>
    )
}

export default forwardRef(RowFormValue);