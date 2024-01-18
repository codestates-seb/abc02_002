import classes from '../../styles/components/CategoryTab.module.css';
import instance from '../../axios';
import React, { useState, useEffect } from 'react';
import CategoryBox from './CategoryBox';
import PaginationBar from './PaginationBar';
// 모집중 / 모집완료 탭을 구분 하는 컴포넌트
const CategoryTab = () => {
  const [activeTab, setActiveTab] = useState('recruiting');
  const [recruitingData, setRecruitingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 12,
    totalElements: 'totalElements',
    totalPages: 'totalPages',
  });
  const fetchParties = async (page, status) => {
    try {
      const response = await instance.get(
        `/v1/parties?page=${page}&size=12&status=${status}`
      );
      const { data } = response;
      // 전체 데이터를 받아왔을 때, 상태(status)에 따라 데이터를 분류합니다.
      const recruitingParties = data.data.filter(
        (party) => party.partyStatus === 'PARTY_OPENED'
      );
      const completedParties = data.data.filter(
        (party) => party.partyStatus === 'PARTY_CLOSED'
      );
      setRecruitingData(recruitingParties);
      setCompletedData(completedParties);

      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && pageInfo.page > 1) {
      fetchParties(pageInfo.page - 1, activeTab);
    } else if (direction === 'next' && pageInfo.page < pageInfo.totalPages) {
      fetchParties(pageInfo.page + 1, activeTab);
    } else if (typeof direction === 'number') {
      fetchParties(direction, activeTab);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchParties(1, tab); // 탭이 변경될 때 해당 탭에 맞는 데이터를 가져오도록 수정
  };

  useEffect(() => {
    fetchParties(pageInfo.page, activeTab);
  }, [activeTab, pageInfo.page]);

  return (
    <div className={classes.categoryTab}>
      <div>
        <button
          onClick={() => handleTabChange('recruiting')}
          style={{
            fontWeight: activeTab === 'recruiting' ? 'bold' : '600',
            background: 'transparent',
            color: activeTab === 'recruiting' ? 'black' : 'gray',
          }}
          className={activeTab === 'recruiting' ? 'active' : ''}
        >
          <p className={classes.join}>모집중</p>
        </button>
        <button
          onClick={() => handleTabChange('completed')}
          style={{
            fontWeight: activeTab === 'completed' ? 'bold' : '600',
            background: 'transparent',
            color: activeTab === 'completed' ? 'black' : 'gray',
          }}
          className={activeTab === 'completed' ? 'active' : ''}
        >
          <p className={classes.end}>모집완료</p>
        </button>
      </div>
      {activeTab === 'recruiting' && (
        <>
          <CategoryBox categoryData={recruitingData} />
          <PaginationBar pageInfo={pageInfo} onPageChange={handlePageChange} />
        </>
      )}
      {activeTab === 'completed' && (
        <>
          <CategoryBox categoryData={completedData} />
          <PaginationBar pageInfo={pageInfo} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};
export default CategoryTab;