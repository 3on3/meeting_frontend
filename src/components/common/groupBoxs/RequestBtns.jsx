import React from "react";
import { useParams } from "react-router-dom";
import {useFetchRequest} from '../../../hook/useFetchRequest';

const RequestBtns = ({ styles, request, setIsChanged }) => {
  const { id: responseGroupId } = useParams();
  const { processFetch, createFetch } = useFetchRequest();

  const payload = {
    requestGroupId: request.id,
    responseGroupId,
  };

  // 수락 버튼 활성화
  const onClickAccept = async () => {
  // 매칭 수락 요청
  await processFetch("response-accept", payload, setIsChanged)
  // 채팅방 생성 요청
    await createFetch(payload, setIsChanged);
  };

  // 거절 버튼 활성화
  const onClickDeny = async ()=>{
    processFetch("response-deny", payload, setIsChanged)
  }
  return (
    <div className={styles.reqTit}>
      <span>매칭 신청이 도착했습니다</span>
      <p>
        <button onClick={onClickAccept}>수락</button>
        <button onClick={onClickDeny}>거절</button>
      </p>
    </div>
  );
};

export default RequestBtns;
