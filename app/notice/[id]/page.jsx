"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "@styles/notice.module.css";
import Image from "next/image";
import Link from "next/link";

import apiCall from "@utils/api-call";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const CustomEditor = dynamic(() => import("../../components/ckeditor"), {
  ssr: false,
});

const NoticeDetail = ({ params }) => {
  const router = useRouter();

  const { id } = params;
  const [notice, setNotice] = useState({});
  const [editable, setEditable] = useState(false);

  // 유저 정보
  const { data: session } = useSession();
  let userInfo = {};
  userInfo = session?.user || {};

  // 제목
  const [title, setTitle] = useState("");
  // 내용
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotice();
  }, [editable]);

  const getNotice = () => {
    apiCall
      .postData("/api/brd/post/detail", {
        pstId: id,
      })
      .then((res) => {
        if (res.data) {
          setNotice(res.data);
          setTitle(res.data.pstTitle);
          setContent(res.data.pstContents);
        }
      });
  };

  const handleEdit = () => {
    if (!editable) {
      // 수정화면으로 변경
      setEditable(true);
      return;
    }
  };

  const handleChildDataChange = (data) => {
    setContent(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editable) {
      if (!title || !title.trim) {
        alert("제목을 입력해주세요.");
        return;
      }

      if (!content || !content.trim) {
        alert("내용을 입력해주세요.");
        return;
      }
    }

    if (!confirm("수정하시겠습니까?")) return;

    const formData = {
      pstId: id,
      brdId: 3,
      pstTitle: title,
      pstContents: content,
      viewYn: "Y",
      modId: userInfo.userId,
    };

    await submitPost(formData);
  };

  const submitPost = async (data) => {
    try {
      const result = await apiCall.postData("/api/brd/post/modify", data);

      if (result.data) {
        alert("수정되었습니다.");
        setEditable(false);
        setNotice(result.data);
        // router.push("/notice/" + result.data.pstId); // 이동할 경로
      }
    } catch (e) {
      console.log("error: ", e);
    }
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
        {editable ? (
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
              <div className={styles.regi_btn}>
                <a href={"/notice"} className={styles.cancel_btn}>
                  목록
                </a>
                <button type="submit" className={styles.regisit_btn}>
                  수정
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.noti_detail}>
            <div className={styles.header}>
              <h3>{notice.pstTitle}</h3>
              <div className={styles.detail_info}>
                <span>
                  게시일 : {notice.regDt ? notice.regDt.substring(0, 10) : ""}
                </span>
                <span>
                  등록자 :{" "}
                  {notice.tbUserReg ? notice.tbUserReg.userName : notice.regId}
                </span>
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
              <button onClick={handleEdit}>수정</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
