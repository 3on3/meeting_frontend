import React from "react";
import { useParams } from "react-router-dom";
import {useFetchRequest} from '../../../hook/useFetchRequest';

const RequestBtns = ({ styles, request, setIsChanged }) => {
  const { id: responseGroupId } = useParams();
  const payload = {
    requestGroupId: request.id,
    responseGroupId,
  };

  const { processFetch, createFetch } = useFetchRequest();

  const onClickAccept = async () => {
  await processFetch("response-accept", payload, setIsChanged)
    await createFetch(payload, setIsChanged);
  };

  return (
    <div className={styles.reqTit}>
      <span>매칭 신청이 도착했습니다</span>
      <p>
        <button onClick={onClickAccept}>수락</button>
        <button onClick={() => processFetch("response-deny")}>거절</button>
      </p>
    </div>
  );
};

export default RequestBtns;
