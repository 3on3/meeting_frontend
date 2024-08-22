import React, { useEffect, useState } from 'react';
import styles from './MypageModal.module.scss';
import { getUserToken } from "../../../../config/auth";

const MypageModal = ({ active, position, onDefaultImage, onChangeProfile }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [profileIntroduce, setProfileIntroduce] = useState('');
  const [univ, setUniv] = useState('');
  const [major, setMajor] = useState('');
  const [membership, setMembership] = useState('');

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
        setMembership(data.membership === "PRIMIUM" ? "프리미엄" : "일반회원");

        // 프로필 이미지 URL을 상태에 저장 (기본 이미지도 이 부분에서 반영)
        if (data.profileImg) {
          setProfileImg(data.profileImg);
        }
      })
      .catch((error) => {
        console.error("프로필 정보를 불러오는 중 오류가 발생했습니다:", error);
      });
  }, []); // 빈 배열로 두어 컴포넌트 마운트 시 한 번만 실행

  const handleDefaultImage = async () => {
    try {
      const response = await fetch('http://localhost:8253/mypage/profileImage/default', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const result = await response.text();
        setProfileImg(result); // 기본 프로필 이미지 URL을 결과에서 가져와 설정
        console.log("기본 프로필 이미지로 설정되었습니다.");
      } else {
        throw new Error("기본 프로필 이미지를 설정하지 못했습니다.");
      }
    } catch (error) {
      console.error("기본 프로필 이미지를 설정하는 중 오류가 발생했습니다:", error);
    }
  };
  

  const modalStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <nav 
      className={active ? `${styles.isActive} ${styles.profileMenu}` : styles.profileMenu}
      style={modalStyles}
    >
      <button 
        className={`${styles.defaultImgBtn} defaultImgBtn`} 
        onClick={() => {
          handleDefaultImage();
          if (onDefaultImage) onDefaultImage(); // 외부에서 전달된 onDefaultImage 함수 호출
        }}
      >
        기본 이미지
      </button>
      <button 
        className={`${styles.changeProfileBtn} changeProfileBtn`} 
        onClick={onChangeProfile} 
      >
        프로필 변경
      </button>
    </nav>
  );
};

export default MypageModal;
