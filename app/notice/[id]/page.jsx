"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import styles from "@styles/notice.module.css";
import Image from "next/image";
import Link from "next/link";
import apiCall from "@utils/api-call";

const NoticeDetail = ({ params }) => {
  const { id } = params;
  const [notice, setNotice] = useState([]);
  //   const notice = notices.find((item) => item.id === parseInt(id));

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = async () => {
    await apiCall
      .postData("/api/brd/post/detail", {
        pstId: id,
      })
      .then((res) => {
        if (res.data) {
          console.log("res.data:: ", res.data);
          setNotice(res.data);
        }
      });
  };

  if (!notice) {
    return notFound();
  }

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
        <div className={styles.noti_detail}>
          <div className={styles.header}>
            <h3>{notice.pstTitle}</h3>
            <div className={styles.detail_info}>
              <span>게시일 : {notice.regDt}</span>
              <span>등록자 : {notice.regId}</span>
            </div>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: notice.pstContents }}
          />
          <div className={styles.btn_section}>
            <Link href={"/notice"} className={styles.btn_list_page}>
              목록
            </Link>
            <button>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
