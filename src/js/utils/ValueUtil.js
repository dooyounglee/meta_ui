export const isNull = (s) => {
    if (s == undefined || s == null || ((typeof s == "string") && s.trim().length == 0)) {
        return true;
    }
    return false;
}