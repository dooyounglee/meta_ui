import * as Message from 'js/utils/MessageUtil';

export const isDate = (str) => {
    if (str instanceof Date) return true;
    return !isNaN(Date.parse(str));
}

export const format = (str, f) => {
    if (!f) f = "YYYY-MM-DD";

    var date = str;
    if (!isDate(str)) {
        date = toDate(str);
    }
    console.log(date)
    if (!isDate(date)) {
        Message.alert("SYS-031"); return;
    }

    try {
        f = f.replace(/YYYY/i, date.getFullYear());
        f = f.replace(/MM/i, date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`);
        f = f.replace(/DD/i, date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`);
        f = f.replace(/HH/i, date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`);
        f = f.replace(/MI/i, date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`);
        f = f.replace(/SS/i, date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`);
        return f;
    } catch (e) {
        console.log(e);
        return;
    }
}

export const now = (f) => {
    return format(new Date(), f);
}

export const toDate = (str) => {
    if (str instanceof Date) return str;

    var str1 = "";
    if (str.length >= 4) str1 = str.substring(0,4);
    if (str.length >= 6) str1 = str1 + "-" + str.substring(4,6);
    if (str.length >= 8) str1 = str1 + "-" + str.substring(6,8);
    if (str.length >= 10) str1 = str1 + " " + str.substring(8,10);
    if (str.length >= 12) str1 = str1 + ":" + str.substring(10,12);
    if (str.length >= 14) str1 = str1 + ":" + str.substring(12,14);
    return new Date(str1);
}

//YYYYMMDD -> YYYY-MM-DD 전환
export const YMDFormatter = (date) => {
    return format(date, "YYYY-MM-DD");
}

//dateType -> YYYYMMDD
export const getYYYYMMDD = (date) => {
    return format(date,"YYYYMMDD");
}

const makeTwoDigit = (number) => {
    return number < 10 ? "0" + number : number.toString();
}

// YYYYMMDD -> dateType
export const YYYYMMDDtoDate = (date_str) =>{
    return toDate(date_str);
}


export const getToday = (f) =>{
    return now(f);
}