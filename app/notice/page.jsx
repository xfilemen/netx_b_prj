"use client";

import { useState } from 'react';
import styles from '/app/styles/notice.module.css';
import Image from 'next/image';
import Link from 'next/link';

const notices = [
  { id: 1, title: '시스템 점검 공지', date: '2024-10-23', author: '이민호' },
  { id: 2, title: '신규 기능 릴리즈 안내', date: '2024-10-20', author: '박지민' },
  { id: 3, title: '이용약관 변경 알림', date: '2024-10-18', author: '최수영' },
  { id: 4, title: '보안 패치 적용 안내', date: '2024-10-16', author: '정다희' },
  { id: 5, title: '서버 증설 작업 공지', date: '2024-10-14', author: '김영준' },
  { id: 6, title: '기능 개선 업데이트', date: '2024-10-12', author: '서지은' },
  { id: 7, title: '정기 점검 일정 안내', date: '2024-10-10', author: '최하나' },
  { id: 8, title: '서비스 장애 복구 공지', date: '2024-10-08', author: '장민수' },
  { id: 9, title: '모바일 앱 업데이트', date: '2024-10-06', author: '오지훈' },
  { id: 10, title: '사용자 설문 조사 참여 요청', date: '2024-10-04', author: '김수정' },
  { id: 11, title: '새로운 테마 추가 안내', date: '2024-10-02', author: '이준호' },
  { id: 12, title: '개인정보 처리 방침 변경', date: '2024-09-30', author: '윤혜진' },
  { id: 13, title: '사용자 계정 보호 강화', date: '2024-09-28', author: '최재훈' },
  { id: 14, title: '신규 기능 릴리즈 안내', date: '2024-10-20', author: '박지민' },
  { id: 15, title: '이용약관 변경 알림', date: '2024-10-18', author: '최수영' },
  { id: 16, title: '보안 패치 적용 안내', date: '2024-10-16', author: '정다희' },
  { id: 17, title: '서버 증설 작업 공지', date: '2024-10-14', author: '김영준' },
  { id: 18, title: '기능 개선 업데이트', date: '2024-10-12', author: '서지은' },
  { id: 19, title: '정기 점검 일정 안내', date: '2024-10-10', author: '최하나' },
  { id: 20, title: '서비스 장애 복구 공지', date: '2024-10-08', author: '장민수' },
  { id: 21, title: '모바일 앱 업데이트', date: '2024-10-06', author: '오지훈' },
  { id: 22, title: '사용자 설문 조사 참여 요청', date: '2024-10-04', author: '김수정' },
  { id: 23, title: '새로운 테마 추가 안내', date: '2024-10-02', author: '이준호' },
  { id: 24, title: '개인정보 처리 방침 변경', date: '2024-09-30', author: '윤혜진' },
  { id: 25, title: '사용자 계정 보호 강화', date: '2024-09-28', author: '최재훈' },
  { id: 26, title: '신규 기능 릴리즈 안내', date: '2024-10-20', author: '박지민' }
];

const NoticeItem = ({ notice }) => (
  <div className={styles.noticeItem}>
    <div>{notice.id}</div>
    <div className={styles.tit_tx}>
      <Link href={`/notice/${notice.id}`}>
        {notice.title}
      </Link>
    </div>
    <div>{notice.date}</div>
    <div>{notice.author}님</div>
  </div>
);

const NoticeBoard = ({ currentPage, noticesPerPage }) => {
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <div className={styles.noticeBoard}>
      <div className={styles.noticeHeader}>
        <div>No.</div>
        <div>제목</div>
        <div>게시일</div>
        <div>등록자</div>
      </div>
      {currentNotices.length > 0 ? (
        currentNotices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))
      ) : (
        <div className={styles.noNotices}>등록된 게시물이 없습니다.</div>
      )}
    </div>
  );
};

export default function NotiPage() { 
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.topbanner}>
        <Image 
          src="/images/detail/TopVisual.png"
          alt="효율적인 인력배치 언제든 문의하세요"
          width={1440}
          height={150}
        />
      </div>
      <div className={styles.wrap}>
        <h2>공지사항</h2>
        <NoticeBoard currentPage={currentPage} noticesPerPage={noticesPerPage} />
        {notices.length > 0 ? (
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.prev}>이전</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.next}>다음</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}