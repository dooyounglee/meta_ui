import { SERVER_URL } from "config";

import URL from 'constants/url';
import * as util from 'js/utils';

/**
 * 사용 ex)
import * as PmsFecth  from ''

const url = "/usr/login/signin"
const requestOptions = {
    method: "POST",
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({JSON값}),
}
PmsFecth.requestFetch(url, requestOptions,
    (response) => {
        //response < 이용해서 후속처리 
    },
    function (error) {
        //에러 필요시
    }
);
 */
export function requestFetch(url, requestOptions, handler, errorHandler) {
  const apiServerUrl = SERVER_URL;
  //CORS ISSUE 로 인한 조치 - origin 및 credentials 추가
  // origin 추가
  if (!requestOptions["origin"]) {
    requestOptions = { ...requestOptions, origin: window.location.host };
  }

  // GET요청이면, requestOptions.body를 url로 옮김
  if (requestOptions.method === "GET" && requestOptions.body) {
    url += "?" + new URLSearchParams(JSON.parse(requestOptions.body)).toString();
    delete requestOptions.body;
  }

  // 토큰 있을경우 넣어주기
  util.Auth.setTokenRequest(requestOptions);
  util.Auth.setRefreshTokenRequest(requestOptions);

  fetch(apiServerUrl + url, requestOptions)
    .then((response) => {
      
      // response headers에 새로운 토큰값이 들어왔다면 갈아 끼워주기
      util.Auth.setNewToken(response);

      switch (response.status) {
        case 200: // 200 일때만 다음으로 넘김
        case 201: 
          return response.json();

        case 401:
        case 403:
        case 404:
          console.log(response)
          throw response;

        case 400: // body에 message가 있어서 json으로 풀기 위해 return. (errorCode<0)
        case 417:
        case 500:
          console.log(response)
          return response.json();
      
        default:
          console.log(response)
          throw response;
      }
    })
    // 여기서 정상적인 callback처리
    .then((response) => {
      
      // BusinessException 및 서버 Exception 일 경우 throw
      if (response.errorCode < 0) throw response;

      if (typeof handler === "function") {
        handler(response);
      } else {
        console.log("not funtion");
      }
    })
    .catch((error) => {
      console.error('There was an error!', error);
      
      if (typeof errorHandler === "function") {
        errorHandler();
      } else if (error.status != null) {
        switch (error.status) {
          case 401:
            alert("잘못된 인증 정보 입니다. 다시 로그인 해주세요.");
            util.Auth.logout();
            window.location.href = URL.MAIN;
            break;

          case 403:
            alert("요청권한이 없습니다.");
            // window.location.href = URL.MAIN;
            break;

          case 404:
            alert("요청URL이 없습니다.");
            break;
        }
      } else if (error.errorCode != null) { // BusinessException
        alert(error.message)
      } else if (error instanceof TypeError && error.message === "Failed to fetch") { // 서버 죽었을 때
        alert("서버 응답이 없습니다. 서버 확인 후 다시 시도해 주세요.");
      } else {
        console.log("예상치 못한 예외가 발생했습니다. 관리자에게 문의 해주세요.")
        // window.location.href = URL.ERROR;
      }

    })
    .finally(() => {
    });
}
