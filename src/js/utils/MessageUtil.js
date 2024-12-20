import * as util from 'js/utils'

export const setMessage = (messages) => {
    let obj = {};
    for (var x of messages) obj[x.msgCd] = x;
    util.Auth.setMessage(obj);
    /* const retrieveDetailURL = '/cmm/message/all';
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        },
    }
    util.Fetch.requestFetch(retrieveDetailURL,
        requestOptions,
        function (resp) {
            let obj = {};
            for (var x of resp.data) obj[x.msgCd] = x;
            util.Auth.setMessage(obj);
        }
    );*/
};

export const remove = () => {
    util.Auth.removeMessage();
};

export const alert = (msgCd, ...rest) => {
    let messageCd = util.Auth.getMessage() || {};
    if (messageCd[msgCd]) {
        window.alert(format(messageCd[msgCd]["msgCn"], rest));
    } else {
        const retrieveDetailURL = '/cmm/message/get?msgCd=' + msgCd;
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        }
        util.Fetch.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                if (!resp.data["msgCd"]) {
                    window.alert(format(msgCd, rest));
                } else {
                    messageCd[msgCd] = resp.data;
                    util.Auth.setMessage(messageCd);
                    window.alert(format(resp.data["msgCn"], rest));
                }
            }, () => {
                alert("메시지 코드를 확인해 주세요.");
            }
        );
    }
}

export const confirm = (msgCd, ...rest) => {
    let messageCd = util.Auth.getMessage() || {};
    if (messageCd[msgCd]) {
        return window.confirm(format(messageCd[msgCd]["msgCn"], rest));
    } else {
        const retrieveDetailURL = '/cmm/message/get?msgCd=' + msgCd;
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        }
        util.Fetch.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                if (resp.data["msgCd"]) {
                    messageCd[msgCd] = resp.data;
                    util.Auth.setMessage(messageCd);
                }
            }, () => {
                window.alert(msgCd);
            }
        );
        return window.confirm(format(msgCd, rest));
    }
}

const format = (msg, args) => {
    var str = msg;
    for (var i in args) {
        str = str.replace("{" + i + "}", args[i]);
    }
    return str;
}