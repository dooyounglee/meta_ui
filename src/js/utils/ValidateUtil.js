import * as Value from 'js/utils/ValueUtil'
import * as Message from 'js/utils/MessageUtil'
import * as Etc from 'js/utils/EtcUtil'

export const validate = (obj, keys) => {
    let keys_array = [];
    if (keys instanceof Array) {
        keys_array = keys;
    } else {
        keys_array = [keys];
    }
    for (let key of keys_array) {
        console.log(key,obj[key])
        if (Value.isNull(obj[key])) {
            return false;
        }
    }
    return true;
}

export const setRequired = (required, ref, title, name) => {
    if (required) {
        if (!ref.current["required"]) ref.current["required"] = [];
        ref.current["required"].push({ key: name, title: title });
    }
}

export const required = (checkRef, editorRefs) => {
    
    // input 필수체크
    for (var ref of checkRef.current) {
        if (!ref) continue; // refOrder누락
        console.log(ref)
        var label, input, value;
        if (ref.querySelectorAll('select').length > 0) {
            label = ref.children[0].children[0].innerHTML;
            input = ref.children[1].children[0].children[0];
            value = input.value;
        } else {
            label = ref.children[0].children[0].innerHTML;
            input = ref.children[1].children[0];
            value = input.value;
        }

        if (value == null || value.trim() === "") {
            Message.alert("CMM-011", label); // ${label} 항목은 필수값입니다.
            input.focus();
            return false;
        }
    }

    // 에디터 필수체크
    if (editorRefs == null) return true;
    
    let editorRef_array = [];
    if (editorRefs instanceof Array) {
        editorRef_array = editorRefs;
    } else {
        editorRef_array = [editorRefs];
    }
    for (var editorRef of editorRef_array) {
        if (editorRef.current.getInstance().getHTML().trim().replace(/<p>|<br>|<\/p>|<\/br>/g,"").length === 0) {
            Message.alert("CMM-011", editorRef.current.props.title); // ${label} 항목은 필수값입니다.
            editorRef.current.getInstance().focus();
            return false;
        }
    }
    return true;
}

export const requiredNode = (ref) => {
    var values = Etc.getValuesFromRefWithRequired(ref);
    console.log(values, ref.current["required"])
    if (!ref.current["required"]) return true;
    
    for (var { key, title } of ref.current["required"]) {
        
        if (!values[key] || values[key].length === 0) {
            Message.alert("CMM-011", title); // ${label} 항목은 필수값입니다.
            // console.log(`${title} 항목은 필수값입니다.`,key)
            try {ref.current[key].focus();}catch{}
            return false;
        } else if (ref.current[key].editorInst && ref.current[key]?.getInstance().getHTML().trim().replace(/<p>|<br>|<\/p>|<\/br>/g,"").length === 0) {
            Message.alert("CMM-011", title); // ${label} 항목은 필수값입니다.
            // console.log(`${title} 항목은 필수값입니다.`,key)
            ref.current[key]?.getInstance().focus();
            return false;
        }
    }
    return true;
}

export const validationCheck = ({ type, value }) => {
    if (type === "mobilePhone") {
        var regexp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        if (!regexp.test(value)) {
            alert("핸드폰 번호 양식이 맞지 않습니다.");
            return false;
        }
        return true;
    }
}