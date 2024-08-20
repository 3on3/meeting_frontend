import React, { useState, useRef, useEffect } from "react";
import styles from "./ProfileSection.module.scss";
import defaultImg from "../../../assets/images/profile.jpg";
import penImg from "../../../assets/images/mypage/pen.svg";
import checkImg from "../../../assets/images/mypage/check.svg";
import ActionSection from "./ActionSection";
import MypageModal from "../components/mypage_modal/MypageModal";
import { getUserToken } from "../../../config/auth";
import paymentImg from "../../../assets/images/mypage/payment.svg";

// ProfileSection 컴포넌트 정의
const ProfileSection = ({ userId }) => {
  // 편집 모드를 위한 상태 변수들 (닉네임, 소개, 전공)
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingMajor, setIsEditingMajor] = useState(false);

  // 사용자 정보를 저장할 상태 변수들
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState(""); 
  const [profileIntroduce, setProfileIntroduce] = useState(""); 
  const [univ, setUniv] = useState(""); 
  const [major, setMajor] = useState(""); 
  const [membership, setMembership] = useState(""); 

  // 프로필 이미지를 관리하기 위한 상태 변수들
  const [profileImg, setProfileImg] = useState(defaultImg); // 
  const [selectedFile, setSelectedFile] = useState(null); // 사용자가 선택한 파일 (프로필 이미지)
  const [modalActive, setModalActive] = useState(false); // 
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); 
  
  // 파일 입력 필드를 참조하기 위한 ref
  const fileInputRef = useRef(null);

  // 닉네임 편집 모드 토글 (활성화/비활성화)
  const editNameToggle = () => {
    if (isEditingName) {
      updateProfileInfo(); // 수정된 부분: 체크 이미지를 클릭할 때 저장
    } else {
      setIsEditingName(true); // 연필 이미지를 클릭할 때 수정 모드 활성화
    }
  };

  // 프로필 소개 편집 모드 토글 (활성화/비활성화)
  const editDescriptionToggle = () => {
    if (isEditingDescription) {
      updateProfileInfo(); // 수정된 부분: 체크 이미지를 클릭할 때 저장
    } else {
      setIsEditingDescription(true); // 연필 이미지를 클릭할 때 수정 모드 활성화
    }
  };

  // 전공 편집 모드 토글 (활성화/비활성화)
  const editMajorToggle = () => {
    if (isEditingMajor) {
      updateProfileInfo(); // 수정된 부분: 체크 이미지를 클릭할 때 저장
    } else {
      setIsEditingMajor(true); // 연필 이미지를 클릭할 때 수정 모드 활성화
    }
  };

  // 닉네임 변경 핸들러
  const nameChangeHandler = (e) => {
    setNickname(e.target.value); // 입력 필드의 값을 닉네임 상태에 저장
  };

  // 프로필 소개 변경 핸들러
  const descriptionChangeHandler = (e) => {
    setProfileIntroduce(e.target.value); // 입력 필드의 값을 프로필 소개 상태에 저장
  };

  // 전공 변경 핸들러
  const majorChangeHandler = (e) => {
    setMajor(e.target.value); // 입력 필드의 값을 전공 상태에 저장
  };


  

  // 사용자 프로필 정보를 서버에 업데이트하는 비동기 함수
const updateProfileInfo = async () => {
  // 사용자가 입력한 프로필 정보를 포함하는 객체 생성
  const updatedProfileData = {
    nickname: nickname,               // 사용자가 입력한 닉네임
    profileIntroduce: profileIntroduce, // 사용자가 입력한 프로필 소개
    major: major,                     // 사용자가 입력한 전공
    profileImg: profileImg            // 현재 프로필 이미지 (사용자가 업로드한 이미지 또는 기본 이미지)
  };

  try {
    console.log("프로필 정보 업데이트를 시작합니다.");
    
    // 서버에 PUT 요청을 보내어 프로필 정보 업데이트
    const response = await fetch(
      `http://localhost:8253/mypage/userInfo/update`, 
      {
        method: "PUT", // HTTP 메소드: PUT (데이터 갱신)
        headers: {
          Authorization: `Bearer ${getUserToken()}`, 
          "Content-Type": "application/json",        
        },
        body: JSON.stringify(updatedProfileData),     
      }
    );

    // 요청이 성공한 경우
    if (response.ok) {
      const data = await response.json(); // 서버로부터의 응답 데이터를 JSON 형태로 파싱
      console.log("프로필 정보가 성공적으로 업데이트되었습니다:", data);

      // 모든 편집 모드를 종료
      setIsEditingName(false);
      setIsEditingDescription(false);
      setIsEditingMajor(false);
    } else {
    
      console.error("응답이 실패했습니다:", response.status, response.statusText);
      throw new Error("프로필 정보를 업데이트하는 중 오류가 발생했습니다.");
    }
  } catch (error) {
 
    console.error("프로필 정보를 업데이트하는 중 오류가 발생했습니다:", error);
  }
};

  // 프로필 이미지 조회
  const fetchProfileImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:8253/mypage/profileImage`, 
        {
          method: "GET", 
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const imageUrl = await response.json(); 
        setProfileImg(imageUrl.profileImg); // 가져온 프로필 이미지를 상태에 저장
      } else {
        const errorMessage = `프로필 이미지를 가져오지 못했습니다.: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage); 
      }
    } catch (error) {
      
      console.error("프로필 이미지를 가져오는 중에 오류가 발생했습니다.:", error.message);
  
    }
  };

  const updateProfileImage = async (file) => {
    const formData = new FormData(); // 파일 데이터를 전송하기 위한 FormData 객체 생성
    formData.append("profileImage", file); // FormData에 파일 추가 (필드 이름은 "profileImage")
  
    try {
      const response = await fetch(
        "http://localhost:8253/mypage/profileImage/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getUserToken()}`, 
     
          },
          body: formData, 
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        console.log("프로필 이미지가 업데이트되었습니다.:", result);
        fetchProfileImage(); // 업데이트 후 새로 이미지를 가져옴
      } else {
        throw new Error("프로필 이미지를 업데이트 하지 못했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지를 업데이트하는 중에 오류가 발생했습니다.:", error);
    }
  };
  

  // 프로필 이미지를 기본 이미지로 리셋
  const resetProfileImage = async () => {
    try {
      const response = await fetch(
        "http://localhost:8253/mypage/profileImage", 
        {
          method: "GET", 
          headers: {
            Authorization: `Bearer ${getUserToken()}`, 
          },
        }
      );

      if (response.ok) {
        console.log("프로필 이미지가 기본값으로 재설정되었습니다.");
        setProfileImg(defaultImg); 
      } else {
        throw new Error("프로필 이미지를 재설정하지 못했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지를 재설정하는 중에 오류가 발생했습니다.:", error);
    }
  };

  // 파일 선택 핸들러 (프로필 이미지 변경 시 사용)
  const fileChangeHandler = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 파일을 가져옴
    setSelectedFile(file); // 선택한 파일을 상태에 저장

    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    reader.onload = () => {
      setProfileImg(reader.result); // 파일을 읽어 미리보기를 위해 프로필 이미지 상태에 저장
    };
    reader.readAsDataURL(file); // 파일을 Data URL로 읽어옴

    updateProfileImage(file); // 파일 업로드하여 프로필 이미지 업데이트
  };

  // 프로필 이미지 클릭 시 모달을 열기 위한 핸들러
  const profileClickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // 클릭된 요소의 위치와 크기 가져오기
    setModalPosition({
      x: rect.left + rect.width / 2 + 40, // 모달 위치 계산
      y: rect.top + window.scrollY + 80,
    });
    setModalActive(!modalActive); // 모달 활성화 상태 토글
  };

  // 컴포넌트가 마운트될 때 사용자 프로필 정보를 가져옴
  useEffect(() => {
    // 사용자 프로필 정보를 가져오는 GET 요청
    fetch(`http://localhost:8253/mypage/userInfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getUserToken()}`, // 사용자의 인증 토큰을 헤더에 포함
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버에서 받은 데이터를 상태에 저장하여 화면에 표시함
        console.log("받은 사용자 프로필 데이터:", data);
        setNickname(data.nickname);
        setAge(data.age);
        setProfileIntroduce(data.profileIntroduce);
        console.log("소개 정보:", data.profileIntroduce);
        setUniv(data.univ);
        setMajor(data.major);
        setMembership(data.membership === "PRIMIUM" ? "프리미엄" : "일반회원");
      })
      .catch((error) => {
        console.error("프로필 정보를 불러오는 중 오류가 발생했습니다:", error);
      });

    fetchProfileImage(); // 프로필 이미지를 서버로부터 가져옴

  }, [userId]); // userId가 변경될 때마다 실행

  return (
    <div className={styles.container}>
      <h1 className={`title ${styles.text}`}>마이페이지</h1>
      
      <div className={styles.profileContainer}>

        <div className={styles.contentsBox}>
          {/* 프로필 이미지 클릭 시 모달을 여는 영역 */}
          <div className={styles.profile} onClick={profileClickHandler}>
            <img src={profileImg} alt="프로필 이미지" />{" "}
            {/* 프로필 이미지 표시 */}
          </div>
          {/* 파일 선택 입력 필드 (화면에는 보이지 않음) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            className={styles.fileInput}
          />
          {/* 모달이 활성화된 경우에만 표시 */}
          {modalActive && (
            <MypageModal
              active={modalActive}
              position={modalPosition}
              onDefaultImage={resetProfileImage}
              onChangeProfile={() => fileInputRef.current.click()}
            />
          )}
          {/* 첫 번째 컨텐츠 영역: 닉네임, 나이, 멤버십 */}
          <div className={styles.firstContents}>
            <div className={styles.content1}>
              {isEditingName ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={nameChangeHandler}
                  onBlur={editNameToggle}
                  className={styles.nameInputField}
                />
              ) : (
                nickname // 닉네임 표시
              )}
            </div>
            <div>
              <img
                src={isEditingName ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingName ? styles.isEditing : ""
                }`}
                alt={isEditingName ? "체크 이미지" : "연필 이미지"}
                onClick={editNameToggle} // 수정된 부분: 클릭 시 저장 또는 수정 모드로 전환
              />
            </div>
            <div className={styles.contentWrap}>
              <div className={styles.content2}>{age}세</div> {/* 나이 표시 */}
              <div className={styles.content3}>{membership}</div>{" "}
              {/* 멤버십 등급 표시 */}
              <div className={styles.paymentBox}>
                <img
                  src={paymentImg}
                  alt={"결제버튼"}
                  // onClick={editNameToggle} // 수정된 부분: 클릭 시 저장 또는 수정 모드로 전환
                />
              </div>
            </div>
          </div>

          {/* 두 번째 컨텐츠 영역: 프로필 소개 */}
          <div className={styles.secondContents}>
            <div className={styles.content4}>
              {isEditingDescription ? (
                <input
                  type="text"
                  value={profileIntroduce}
                  onChange={descriptionChangeHandler}
                  onBlur={editDescriptionToggle}
                  className={styles.descInputField}
                />
              ) : (
                profileIntroduce // 프로필 소개 표시
              )}
            </div>
            <div>
              <img
                src={isEditingDescription ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingDescription ? styles.isEditing : ""
                }`}
                alt={isEditingDescription ? "체크 이미지" : "연필 이미지"}
                onClick={editDescriptionToggle} // 수정된 부분: 클릭 시 저장 또는 수정 모드로 전환
              />
            </div>
          </div>

          {/* 세 번째 컨텐츠 영역: 대학교, 학과 */}
          <div className={styles.thirdContents}>
            <div className={styles.content5}>{univ}</div> {/* 대학교 표시 */}
            <div className={styles.content6}>
              {isEditingMajor ? (
                <input
                  type="text"
                  value={major}
                  onChange={majorChangeHandler}
                  onBlur={editMajorToggle}
                  className={styles.majorinputField}
                />
              ) : (
                major // 학과 표시
              )}
            </div>
            <div>
              <img
                src={isEditingMajor ? checkImg : penImg}
                className={`${styles.pencil} ${
                  isEditingMajor ? styles.isEditing : ""
                }`}
                alt={isEditingMajor ? "체크 이미지" : "연필 이미지"}
                onClick={editMajorToggle} // 수정된 부분: 클릭 시 저장 또는 수정 모드로 전환
              />
            </div>
          </div>
        </div>
      </div>
      {/* 추가 작업을 위한 ActionSection 컴포넌트 */}
      <div className={styles.actionContainer}>
        <ActionSection />
      </div>
    </div>
  );
};

export default ProfileSection;
