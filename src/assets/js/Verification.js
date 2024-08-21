

/**
 * 이메일 검증을 위한 메서드
 * @param email - 검증할 이메일
 * @returns {boolean} - 이메일 패턴이 맞다면 true, 아니라면 false
 */
export const emailVerification = (email) => {
    // 간단한 이메일 패턴 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}

/**
 * 이름 검증을 위한 메서드
 * @param name - 검증할 이름
 * @returns {boolean} - 이름이 한국어이고, 이름의 길이가 2~6 사이라면 true, 아니면 false
 */
export const nameVerification = (name) => {
    // 이름이 한국어인지 패턴 검사
    const namePattern = /^[\uAC00-\uD7AF]+$/;

    return (namePattern.test(name) && 2 <= name.length && name.length <= 6);
}

/**
 * 생년월일 검증을 위한 메서드
 * @param birth - 검증할 생년월일
 * @returns {boolean} - 생년월일이 6글자이고, 숫자로만 이루어져 있다면 true, 아니면 false
 *  --- 검토사항 --- 나이 제한을 할까?? (토의 필요) (예정)
 */
export const birthVerification = (birth) => {
    // 생년월일이 숫자인지 판단하는 패턴
    const birthPattern = /^\d+$/;

    return (birthPattern.test(birth) && birth.length === 6);
}

/**
 * 비밀번호 검증을 위한 메서드
 * @param password - 검증할 비밀번호
 * @returns {boolean} - 비밀번호가 최소 1개의 숫자, 영어(대, 소문자), 특수문자를 포함하며 8~12글자이면 true, 아니면 false
 */
export const passwordVerification = (password) => {
    // 비밀번호가 최소 1개의 숫자, 영어(대,소문자), 특수문자를 포함하는지 확인하는 패턴
    const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/;

    return (passwordPattern.test(password) && 8 <= password.length && password.length <= 12);
}

/**
 * 닉네임 검증을 위한 메서드
 * @param nickName - 검증할 닉네임
 * @returns {boolean} - 닉네임이 2~6글자 사이라면 true, 아니면 false
 * 중복검사는 백에서 해야할듯(?)
 */
export const nickNameVerification = (nickName) => {

    return (2 <= nickName.length && nickName.length <= 6);
}


/**
 * 핸드번 번호 검증을 위한 메서드
 * @param phoneNumber - 검증할 핸드폰 번호, 앞 3자리 뒷 4자리 각각 만들었습니다.
 * @returns {boolean} - 다 번호로 이루어지고 자리에 맞는 글자수를 가지면 true 아니면 false;
 */
export const firstPhoneNumberVerification = (phoneNumber) => {
    const phoneNoPattern = /^\d+$/;

    if(phoneNumber === null) return false;

    return phoneNoPattern.test(phoneNumber) && phoneNumber.length ===3;
}

export const secondPhoneNumberVerification = (phoneNumber) => {
    const phoneNoPattern = /^\d+$/;

    if(phoneNumber === null) return false;


    return phoneNoPattern.test(phoneNumber) && phoneNumber.length === 4;
}

export const genderVerification = (gender) => {
    return (gender === '남' || gender === '여');
}