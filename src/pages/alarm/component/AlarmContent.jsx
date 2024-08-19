import React from 'react';

const AlarmContent = ({alarm}) => {
    return (
        <div>
            <div>프로필 이미지</div>
            <div>{`${alarm.requestGroupName}에서`}<br/>매칭신청이 들어왔습니다.</div>

        </div>
    );
};

export default AlarmContent;