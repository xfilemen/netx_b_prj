"use client";

import { useState, useEffect } from "react";
import styles from "@styles/notice.module.css";
import Image from "next/image";
import Link from "next/link";
import apiCall from "@utils/api-call";

const NoticeItem = ({ notice, no }) => {
  let formattedDate = "";
  let userName = "";

  if (notice.regDt) {
    formattedDate = notice.regDt.substring(0, 10);
  }
  if (notice.tbUserReg) {
    userName = notice.tbUserReg.userName;
  }

  return (
    <div className={styles.noticeItem}>
      <div>{no + 1}</div>
      <div className={styles.tit_tx}>
        <Link href={`/notice/${notice.pstId}`}>{notice.pstTitle}</Link>
      </div>
      <div>{formattedDate}</div>
      <div>{userName}님</div>
    </div>
  );
};

const NoticeBoard = ({ notices, totalCnt, currentPage, noticesPerPage }) => {
  return (
    <div className={styles.noticeBoard}>
      <div className={styles.noticeHeader}>
        <div>No.</div>
        <div>제목</div>
        <div>게시일</div>
        <div>등록자</div>
      </div>
      {notices.length > 0 ? (
        notices.map((notice, i) => (
          <NoticeItem
            key={`${notice.pstId}-${i}`}
            notice={notice}
            no={totalCnt - (currentPage - 1) * noticesPerPage - (i + 1)}
          />
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
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    getNotices();
  }, [currentPage]);

  const getNotices = async () => {
    await apiCall
      .postData("/api/brd/post/list", {
        page: currentPage,
        pageSize: noticesPerPage,
        brdId: 3,
      })
      .then((res) => {
        if (res.data) {
          setNotices(res.data.tbPost);
          setTotalCnt(res.data.totalCnt);
          setTotalPages(Math.ceil(res.data.totalCnt / noticesPerPage));
        }
      });
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = async () => {
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
        <NoticeBoard
          key={`${currentPage}-${notices.length}`}
          currentPage={currentPage}
          noticesPerPage={noticesPerPage}
          notices={notices}
          totalCnt={totalCnt}
        />
        {notices.length > 0 ? (
          <div className={styles.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.prev}
            >
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.next}
            >
              다음
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={styles.btn}>
          <Link href={"/notice/regist"}>등록</Link>
        </div>
      </div>
    </div>
  );
}
