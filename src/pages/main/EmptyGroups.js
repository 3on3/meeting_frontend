import React from "react";
import MatchingButton from "../../components/common/buttons/matchingButton/MatchingButton";
import logo from "../../assets/images/login/logo.svg";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";

const EmptyGroups = ({isGroup}) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
      if(!isGroup) {
          navigate("/group/create");
      } else {
          navigate("/")
      }

  };
  return (
    <div className={styles.emptyGroup}>
      <div className={styles.logo}>
        <img src={logo}></img>
      </div>
      <div className={styles.topText}>
          {!isGroup ? `아직 생성된 그룹이 없습니다` : `아직 생성된 채팅이 없습니다.`}
      </div>
      <div className={styles.text}>
          {!isGroup?
              (
                  <>
                      그룹을 생성해서
                      <br/>
                      과팅에 참여해보세요!
                  </>
              ) :
              (
                  <>
                      그룹 매칭을 통해
                      <br/>
                      과팅에 참여해보세요!
                  </>
              )
          }
      </div>
      <div className={styles.groupCreateBt}>
        <MatchingButton text={!isGroup? "그룹 생성" : "매칭 신청"} onClickHandler={onClickHandler} />
      </div>
    </div>
  );
};

export default EmptyGroups;
