export const KEY_PARAM = "oti_meta_param";
export const KEY_RETURN_VALUE = "oti_meta_return_value";

let _window_open;

// 부모꺼
export const open = (url, target, windowFeature, param, fnClose) => {
    if (_window_open && _window_open.name == target) {
        _window_open.focus();
        return;
    }
    _window_open = window.open(url, target, `width=${windowFeature.width}, height=${windowFeature.height}`, "noreferer");
    window[KEY_PARAM] = param;
    window[KEY_RETURN_VALUE] = (val) => {
        fnClose(val);
    }

}

// 자식꺼
export const windowClose = (val) => {
    window.opener[KEY_RETURN_VALUE](val);
    window.close();
}

// 자식꺼
export const getOpenerParam = () => {
    return window.opener[KEY_PARAM];
}