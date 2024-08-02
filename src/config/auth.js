import { redirect } from "react-router-dom";

//로그인한 유저의 정보 가져오기
const getUserData = () => {
  const userDataJson = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJson);
  return userData;
};

//인증 토큰만 가져오기
export const getUserToken = () => {
  return getUserData().token;
};

//로그인 회원정보를 불러오는 ㅣoader
export const userDataLoader = () => {
  return getUserData();
};

//접근 권한을 확인하는 loader
export const authCheckLoader = () => {
  const userData = getUserData();
  if (!userData) {
    alert("로그인이 필요한 서비스입니다.");
    return redirect("/");
  }
  return null; // 현재 페이지에 머뭄
};
