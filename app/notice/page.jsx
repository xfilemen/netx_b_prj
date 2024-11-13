"use client";

import { useState, useEffect } from "react";
import styles from "@styles/notice.module.css";
import Image from "next/image";
import Link from "next/link";
import apiCall from "@utils/api-call";

const NoticeItem = ({ notice, no }) => (
  <div className={styles.noticeItem}>
    <div>{no + 1}</div>
    <div className={styles.tit_tx}>
      <Link href={`/notice/${notice.pstId}`}>{notice.pstTitle}</Link>
    </div>
    <div>{notice.regDt}</div>
    <div>{notice.regId}</div>
  </div>
);

const NoticeBoard = ({ currentPage, noticesPerPage, notices }) => {
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
        currentNotices.map((notice, i) => (
          <NoticeItem key={notice.pstId} notice={notice} no={i} />
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
  const [notices, setNotices] = useState([{}]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getNotices();
  }, []);

  const getNotices = async () => {
    await apiCall
      .postData("/api/brd/post/list", {
        page: currentPage,
        pageSize: noticesPerPage,
      })
      .then((res) => {
        if (res.data) {
          setNotices(res.data);
          setTotalPages(Math.ceil(res.data.length / noticesPerPage));
        }
      });
  };

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
        <NoticeBoard
          currentPage={currentPage}
          noticesPerPage={noticesPerPage}
          notices={notices}
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
