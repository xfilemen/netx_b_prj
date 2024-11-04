"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "/app/styles/myinfo.module.css";
import SelectBox from "../components/select";
import Image from "next/image";
import apiHandler from "../../utils/api-handler.js";
import { useRouter } from "next/navigation";

export default function myInfoPage() {
  const { data: session } = useSession();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const router = useRouter(); // useRouter 훅 사용
  const [formData, setFormData] = useState({
    userId: "",
    authName: "",
    userName: "",
    comCd: "",
    deptName: "",
    password: "",
    confirmPassword: "",
    modId: "",
  });

  let userInfo = {};
  userInfo = session?.user || {};
  useEffect(() => {
    console.log("session::", session);
    // 그룹사가 session의 user.compName과 같은 label 값을 가지는 경우 초기 선택값으로 설정
    if (session?.user?.compName) {
      const matchingGroup = groupType.find(
        (group) => group.label === session.user.compName
      );
      if (matchingGroup) {
        setSelectedGroup(matchingGroup.value);
        console.log("(matchingGroup) ", matchingGroup);
      }
    }

    // 계정 정보 초기화
    setFormData({
      userId: userInfo.userId,
      comCd: selectedGroup?.value || "",
      authName: userInfo.authName || "",
      userName: userInfo.userName || "",
      deptName: userInfo.deptName || "",
      password: "",
      confirmPassword: "",
      modId: userInfo.userId || "",
    });
  }, [session]);

  // 그룹
  const groupType = [
    { value: "U001", label: "디아이웨어" },
    { value: "U002", label: "CJ올리브네트웍스" },
    { value: "U003", label: "CJ올리브영" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 로그아웃 처리
  const handleSignOut = () => {
    window.alert("로그인 화면으로 이동합니다.");
    signOut({ callbackUrl: "/user/login" });
  };

  const submitData = async (formData) => {
    try {
      console.log("formData:", formData);
      const result = await apiHandler.postData("/api/user/modify", formData); // POST 요청

      if (result.data === undefined) {
        console.log("실패", result.data);
      } else {
        // 성공
        console.log("asdf", result.data);
        // 로그아웃 -> 로그인 화면 이동.
        handleSignOut();
      }
    } catch (error) {
      console.log("/api/user/modify myinfo", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (window.confirm("나의 정보를 수정하시겠습니까?")) {
      // 수정 api
      submitData(formData);
    }
  };
  const handleFormCancel = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (
      window.confirm(
        "수정하신 내용이 저장 되지않습니다. 그래도 취소하시겠습니까?"
      )
    ) {
      // main 으로 리다이렉트
      router.push("/main");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
          <h2>나의 정보</h2>
          <div className={styles.myinfo_detail}>
            <div className={styles.item_half}>
              <span className={styles.tx}>계정 구분</span>
              <span className={styles.p_tx}>{userInfo.authName}</span>
            </div>
            <div className={styles.item_half}>
              <span className={styles.tx}>이름</span>
              <span className={styles.p_tx}>{userInfo.userName}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.tx}>CJ World 계정</span>
              <span className={styles.p_tx}>gildong.hong@cj.net </span>
            </div>
            <div className={styles.item_half1}>
              <span className={styles.tx}>그룹사</span>
              <span className={styles.p_tx}>
                <SelectBox
                  options={groupType}
                  name="comCd"
                  defaultValue={selectedGroup}
                  onChange={handleInputChange} // 상태 업데이트 핸들러 추가
                />
              </span>
            </div>
            <div className={styles.item_half1}>
              <span className={styles.tx}>소속</span>
              <span className={styles.p_tx}>
                <input
                  type="text"
                  name="deptName"
                  className={styles.txt}
                  value={formData.deptName}
                  onChange={handleInputChange}
                />
              </span>
            </div>
            <div className={styles.item_pd}>
              <span className={styles.tx}>비밀번호</span>
              <span className={styles.p_tx}>
                <input
                  type="password"
                  name="password"
                  className={styles.txt}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </span>
            </div>
            <div className={`${styles.item_pd} ${styles.no_line}`}>
              <span className={styles.tx}>비밀번호 확인</span>
              <span className={styles.p_tx}>
                <input
                  type="password"
                  name="confirmPassword"
                  className={styles.txt}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </span>
            </div>
          </div>
          <div className={styles.btn_section}>
            <button
              type="button"
              onClick={handleFormCancel}
              className={styles.cancel_btn}
            >
              취소
            </button>
            <button type="submit" className={styles.aply_btn}>
              수정
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
