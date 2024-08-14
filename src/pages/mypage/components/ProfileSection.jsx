import React, { useState, useRef, useEffect } from "react";
import styles from "./ProfileSection.module.scss";
import defaultImg from "../../../assets/images/profile.jpg";
import penImg from "../../../assets/images/mypage/pen.svg";
import checkImg from "../../../assets/images/mypage/check.svg";
import ActionSection from "./ActionSection";
import MypageModal from "../components/mypage_modal/MypageModal";
import { getUserToken } from "../../../config/auth";

// ProfileSection 컴포넌트 정의
const ProfileSection = ({ userId }) => {
  // 편집 모드를 위한 상태 변수들 (닉네임, 소개, 전공)
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingMajor, setIsEditingMajor] = useState(false);

  // 사용자 정보를 저장할 상태 변수들
  const [nickname, setNickname] = useState(""); // 닉네임
  const [age, setAge] = useState(""); // 나이
  const [profileIntroduce, setProfileIntroduce] = useState(""); // 프로필 소개
  const [univ, setUniv] = useState(""); // 대학교
  const [major, setMajor] = useState(""); // 학과

  // 프로필 이미지를 관리하기 위한 상태 변수들
  const [profileImg, setProfileImg] = useState(defaultImg); // 프로필 이미지 (기본 이미지는 defaultImg)
  const [selectedFile, setSelectedFile] = useState(null); // 사용자가 선택한 파일 (프로필 이미지)
  const [modalActive, setModalActive] = useState(false); // 프로필 이미지 변경 모달의 활성화 여부
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달의 위치

  // 파일 입력 필드를 참조하기 위한 ref
  const fileInputRef = useRef(null);

  // 닉네임 편집 모드 토글 (활성화/비활성화)
  const editNameToggle = () => {
    setIsEditingName(!isEditingName); // 현재 편집 모드 상태를 반전시킴
  };
0
  // 프로필 소개 편집 모드 토글 (활성화/비활성화)
  const editDescriptionToggle = () => {
    setIsEditingDescription(!isEditingDescription); // 현재 편집 모드 상태를 반전시킴
  };

  // 전공 편집 모드 토글 (활성화/비활성화)
  const editMajorToggle = () => {
    setIsEditingMajor(!isEditingMajor); // 현재 편집 모드 상태를 반전시킴
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

  // 파일 선택 핸들러 (프로필 이미지 변경 시 사용)
  const fileChangeHandler = (e) => {
    const file = e.target.files[0]; // 사용자가 선택한 파일을 가져옴
    setSelectedFile(file); // 선택한 파일을 상태에 저장

    const reader = new FileReader(); // FileReader 객체를 생성
    reader.onload = () => {
      setProfileImg(reader.result); // 파일을 읽은 결과(base64)를 프로필 이미지 상태에 저장
      console.log("프로필 이미지가 변경되었습니다:", reader.result); // 변경된 프로필 이미지의 데이터를 로그로 출력
    };
    reader.readAsDataURL(file); // 파일을 base64 형식으로 읽음
  };

  // 기본 프로필 이미지로 되돌리는 핸들러
  const setDefaultImageHandler = () => {
    setProfileImg(defaultImg); // 프로필 이미지를 기본 이미지로 설정
    setSelectedFile(null); // 선택된 파일 초기화
    setModalActive(false); // 모달을 닫음
    console.log("기본 프로필 이미지로 설정되었습니다."); // 기본 이미지로 변경되었음을 로그로 출력
  };

  // 프로필 이미지 변경 모달을 여는 핸들러
  const changeProfileHandler = () => {
    fileInputRef.current.click(); // 파일 입력 필드를 클릭하여 파일 선택 창을 엶
    setModalActive(false); // 모달을 닫음
  };

  // 프로필 이미지를 클릭했을 때 모달을 열고 위치를 설정하는 핸들러
  const profileClickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // 클릭된 요소의 위치와 크기를 가져옴
    setModalPosition({
      x: rect.left + rect.width / 2 + 40,
      y: rect.top + window.scrollY + 80 
    });
    setModalActive(!modalActive); // 모달을 열거나 닫음
    console.log("프로필 이미지가 클릭되었습니다."); 
  };

  useEffect(() => {
    // 사용자 프로필 정보를 가져오는 GET 요청
    fetch(`http://localhost:8253/mypage/userInfo`, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
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
        setUniv(data.univ); 
        setMajor(data.major); 
      })
      .catch((error) => {
        console.error("프로필 정보를 불러오는 중 오류가 발생했습니다:", error);
      });


    // 사용자 프로필 이미지를 서버로부터 URL 형태로 받아옴
    fetch(`http://localhost:8253/mypage/profile/${userId}`, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        "Content-Type": "application/json", 
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // 서버에서 JSON 응답을 받아옴
        } else {
          throw new Error("프로필 이미지를 불러오는 중 오류가 발생했습니다.");
        }
      })
      .then((data) => {
        setProfileImg(data.profileImageUrl); // 서버에서 받은 이미지 URL을 프로필 이미지 상태에 설정
        console.log("받은 프로필 이미지 URL:", data.profileImageUrl); 
      })
      .catch((error) => {
        console.error("프로필 이미지를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, [userId]); // userId가 변경될 때마다 실행

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.contentsBox}>
          <h1 className={`title ${styles.text}`}>마이페이지</h1>
          {/* 프로필 이미지 클릭 시 모달을 여는 영역 */}
          <div className={styles.profile} onClick={profileClickHandler}>
            <img src={profileImg} alt="프로필 이미지" /> {/* 프로필 이미지 표시 */}
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
          {modalActive && 
            <MypageModal
              active={modalActive}
              position={modalPosition}
              onDefaultImage={setDefaultImageHandler}
              onChangeProfile={changeProfileHandler}
            />
          }
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
                onClick={editNameToggle}
              />
            </div>
            <div className={styles.contentWrap}>
              <div className={styles.content2}>{age}세</div> {/* 나이 표시 */}
              <div className={styles.content3}>일반회원</div> {/* 멤버십 등급 표시 */}
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
                onClick={editDescriptionToggle}
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
                onClick={editMajorToggle}
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



// import React, { useState, useRef } from "react";
// import styles from "./ProfileSection.module.scss";
// import defaultImg from "../../../assets/images/profile.jpg";
// import penImg from "../../../assets/images/mypage/pen.svg";
// import checkImg from "../../../assets/images/mypage/check.svg";
// import ActionSection from "./ActionSection";
// import MypageModal from "../components/mypage_modal/MypageModal";

// const ProfileSection = () => {
//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [isEditingMajor, setIsEditingMajor] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [major, setMajor] = useState("");

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [profileImg, setProfileImg] = useState(defaultImg);
//   const [modalActive, setModalActive] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
//   const fileInputRef = useRef(null);

//   const editNameToggle = () => {
//     setIsEditingName(!isEditingName);
//   };

//   const editDescriptionToggle = () => {
//     setIsEditingDescription(!isEditingDescription);
//   };

//   const editMajorToggle = () => {
//     setIsEditingMajor(!isEditingMajor);
//   };

//   const nameChangeHandler = (e) => {
//     setName(e.target.value);
//   };

//   const descriptionChangeHandler = (e) => {
//     setDescription(e.target.value);
//   };

//   const majorChangeHandler = (e) => {
//     setMajor(e.target.value);
//   };

//   // 파일 변경 핸들러
//   const fileChangeHandler = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);

//     const reader = new FileReader();
//     reader.onload = () => {
//       setProfileImg(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };


//   // 모달에서 기본 이미지로 설정
//   const setDefaultImageHandler = () => {
//     setProfileImg(defaultImg);
//     setSelectedFile(null);
//     setModalActive(false);
//   };

//   // 모달에서 프로필 변경 선택
//   const changeProfileHandler = () => {
//     fileInputRef.current.click();
//     setModalActive(false);
//   };

//   // 프로필 이미지 클릭 핸들러
//   const profileClickHandler = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setModalPosition({
//       x: rect.left + rect.width / 2 + 40,
//       y: rect.top + window.scrollY + 80
//     });
//     setModalActive(!modalActive);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.profileContainer}>
//         <div className={styles.contentsBox}>
//           <h1 className={`title ${styles.text}`}>마이페이지</h1>
//           <div className={styles.profile} onClick={profileClickHandler}>
//             <img src={profileImg} alt="프로필 이미지" />
//           </div>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={fileChangeHandler}
//             className={styles.fileInput}
//           />
//           {modalActive && 
//             <MypageModal
//               active={modalActive}
//               position={modalPosition}
//               onDefaultImage={setDefaultImageHandler}
//               onChangeProfile={changeProfileHandler}
//             />
//           }
//           <div className={styles.firstContents}>
//             <div className={styles.content1}>
//               {isEditingName ? (
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={nameChangeHandler}
//                   onBlur={editNameToggle}
//                   className={styles.nameInputField}
//                 />
//               ) : (
//                 name
//               )}
//             </div>
//             <div>
//               <img
//                 src={isEditingName ? checkImg : penImg}
//                 className={`${styles.pencil} ${
//                   isEditingName ? styles.isEditing : ""
//                 }`}
//                 alt={isEditingName ? "체크 이미지" : "연필 이미지"}
//                 onClick={editNameToggle}
//               />
//             </div>
//             <div className={styles.contentWrap}>
//             <div className={styles.content2}>22세</div>
//             <div className={styles.content3}>일반회원</div>
//             </div>
         
//           </div>

//           <div className={styles.secondContents}>
//             <div className={styles.content4}>
//               {isEditingDescription ? (
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={descriptionChangeHandler}
//                   onBlur={editDescriptionToggle}
//                   className={styles.descInputField}
//                 />
//               ) : (
//                 description
//               )}
//             </div>
//             <div>
//               <img
//                 src={isEditingDescription ? checkImg : penImg}
//                 className={`${styles.pencil} ${
//                   isEditingDescription ? styles.isEditing : ""
//                 }`}
//                 alt={isEditingDescription ? "체크 이미지" : "연필 이미지"}
//                 onClick={editDescriptionToggle}
//               />
//             </div>
//           </div>

//           <div className={styles.thirdContents}>
//             <div className={styles.content5}>건국대</div>
//             <div className={styles.content6}>
//               {isEditingMajor ? (
//                 <input
//                   type="text"
//                   value={major}
//                   onChange={majorChangeHandler}
//                   onBlur={editMajorToggle}
//                   className={styles.majorinputField}
//                 />
//               ) : (
//                 major
//               )}
//             </div>
//             <div>
//               <img
//                 src={isEditingMajor ? checkImg : penImg}
//                 className={`${styles.pencil} ${
//                   isEditingMajor ? styles.isEditing : ""
//                 }`}
//                 alt={isEditingMajor ? "체크 이미지" : "연필 이미지"}
//                 onClick={editMajorToggle}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className={styles.actionContainer}>
//         <ActionSection />
//       </div>
//     </div>
//   );
// };

// export default ProfileSection;