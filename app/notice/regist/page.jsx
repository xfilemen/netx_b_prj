"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import styles from "@styles/notice.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import dynamic from "next/dynamic";
import apiCall from "@utils/api-call";

const CustomEditor = dynamic(() => import("../../components/ckeditor"), {
  ssr: false,
});

const NoticeCreatePage = () => {
  const router = useRouter();

  // 유저 정보
  const { data: session } = useSession();
  let userInfo = {};
  userInfo = session?.user || {};

  // 제목
  const [title, setTitle] = useState("");
  // 내용
  const [content, setContent] = useState("");
  //   const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const triggerFileSelect = () => {
  //   document.getElementById("fileInput").click();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !title.trim) {
      alert('제목을 입력해주세요.');
      return;
    }

    if(!content || !content.trim) {
      alert('내용을 입력해주세요.');
      return;
    }
      
    if(!confirm('등록 하시겠습니까?')) return;

    const formData = {
      brdId: 3,
      pstTitle: title,
      pstContents: content,
      viewYn: "Y",
      regId: userInfo.userId,
    }
    
    await submitPost(formData);
  };


  const submitPost = async(data) => {
    try{
      const result = await apiCall.postData("/api/brd/post/regist", data);

      if(result.data) {
        alert('등록되었습니다.');
        router.push('/notice'); // 이동할 경로
      }
    }
    catch(e){
      console.log("error: ", e);
    }

  };
  
  const handleChildDataChange = (data) => {
    setContent(data);
  };

  useEffect(()=>{

  }, []);

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
        <h2>공지사항 등록</h2>
        <div className={styles.noti_regist}>
          <form onSubmit={handleSubmit}>
            <div className={styles.header}>
              <label>제목</label>
              <input
                type="text"
                value={title}
                placeholder="제목을 입력해 주세요. (최대 40자)"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={styles.content}>
              <div className={styles.ckeditor}>
                <CustomEditor
                  onDataChange={handleChildDataChange}
                  content={content}
                />
              </div>
            </div>
            {/* <div className={styles.file_submit}>
              <label className={styles.file_label}>
                <Image
                  src="/images/ico/ico_file_blt.png"
                  alt="파일첨부 blt"
                  width={8}
                  height={14}
                  className={styles.file_blt_img}
                />
                파일 첨부
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <span className={styles.file_tx}>
                {file ? `${file.name}` : "첨부파일이 없습니다."}
              </span>
              <button
                type="button"
                onClick={triggerFileSelect}
                className={styles.submit_btn}
              >
                첨부 파일
              </button>
            </div> */}
            <div className={styles.regi_btn}>
              <a href={"/notice"} className={styles.cancel_btn}>
                목록
              </a>
              <button
                type="submit"
                className={styles.regisit_btn}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoticeCreatePage;