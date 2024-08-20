import React, { useState } from 'react';

const TabBox = ({styles,className, activeTab, setActiveTab}) => {

    const onClickActive = (tab) => {
      setActiveTab(tab); // 클릭된 탭의 상태를 설정
    };
  return (
    <div className={className}>
  <button
        className={`${styles.tabBtn} ${activeTab === 'all' ? styles.isActive : ''}`}
        onClick={() => onClickActive('all')}
      >
        전체 글
      </button>
      <button
        className={`${styles.tabBtn} ${activeTab === 'myPosts' ? styles.isActive : ''}`}
        onClick={() => onClickActive('myPosts')}
      >
        내가 쓴 글
      </button>
    </div>
  );
};

export default TabBox;