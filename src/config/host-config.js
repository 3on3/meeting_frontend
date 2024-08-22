const LOCAL_PORT = 8253; // 백엔드 로컬 서버 포트번호

// 예를들어 지금 요청하는 브라우저의 host가 http://localhost:3000 이라면
// hostname은 localhost만 리턴
// https://www.naver.com => hostname은 www.naver.com만 리턴
const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === "localhost") {
  backendHostName = "http://localhost:" + LOCAL_PORT;
} else if (
  clientHostName ===
  "http://mymeetinh-s3-bucket.s3-website.ap-northeast-2.amazonaws.com"
) {
  backendHostName = "http://3.35.133.17:8253";
}

export const API_BASE_URL = backendHostName;

const SIGNUP = "/signup";
const GROUP = "/group";
const GROUPMATCHING = "/group/matching";
const MYPAGE = "/mypage";
const TESTCHAT = "/testChat";
const CHATROOM = "/chatroom";
const ALARM = "/alarm";
const USER = "/user";
const FILE = "/file";
const PASSWORD = "/password";
const PAYMENT = "/payment";
const MAIN = "/main";

export const MAIN_URL = API_BASE_URL + MAIN;
export const AUTH_URL = API_BASE_URL + SIGNUP;
export const GROUP_URL = API_BASE_URL + GROUP;
export const MYPAGE_URL = API_BASE_URL + MYPAGE;
export const MYPAGEMATCHING_URL = API_BASE_URL + GROUPMATCHING;
export const TESTCHT_URL = API_BASE_URL + TESTCHAT;
export const CHATROOM_URL = API_BASE_URL + CHATROOM;
export const ALARM_URL = API_BASE_URL + ALARM;

export const USER_URL = API_BASE_URL + USER;
export const FILE_URL = API_BASE_URL + FILE;
export const PASSWORD_URL = API_BASE_URL + PASSWORD;
export const PAYMENT_URL = API_BASE_URL + PAYMENT;

