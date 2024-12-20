const CONTEXT_PATH = "/api";
export const SERVER_URL = "http://"+process.env.REACT_APP_EGOV_CONTEXT_URL + CONTEXT_PATH; // REST API 서버 Domain URL
export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // default = 공지사항 게시판 아이디
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // 공지사항 게시판 아이디
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB"; // 갤러리 게시판 아이디

export const KEY_ID = "KEY_ID";
export const KEY_SAVE_ID_FLAG = "KEY_SAVE_ID_FLAG";
export const JSON_WEB_TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const JSON_WEB_TOKEN_HEADER_KEY = "X-AUTH-TOKEN";
export const REFRESH_TOKEN_HEADER_KEY = "X-AUTH-REFRESH-TOKEN";
export const LOGIN_USER_KEY = "loginUser";