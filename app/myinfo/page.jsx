"use client";

import { useEffect, useState, useRef } from "react";
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
    userPwd: "",
    confirmPassword: "",
    modId: "",
  });

  // useRef 훅을 사용하여 input 참조 생성
  const deptRef = useRef(null);
  const confirmPwdRef = useRef(null);

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
      userPwd: "",
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

      console.log("result::", result);
      if (result.data === undefined) {
        console.log("실패", result.data);
      } else {
        // 로그아웃 -> 로그인 화면 이동.
        handleSignOut();
      }
    } catch (error) {
      console.log("/api/user/modify myinfo", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 필수 값 체크 및 포커스 설정
    if (!formData.comCd) {
      alert("그룹사를 선택해 주세요.");
      // groupRef.current.focus();
      return;
    }
    if (!formData.deptName.trim()) {
      alert("소속을 입력해 주세요.");
      deptRef.current.focus();
      return;
    }

    if (formData.confirmPassword.trim() && !formData.userPwd.trim()) {
      alert("비밀번호를 입력해 주세요.");
      confirmPwdRef.current.focus();
      return;
    }

    if (formData.userPwd.trim()) {
      if (!formData.confirmPassword.trim()) {
        alert("비밀번호 확인을 입력해 주세요.");
        confirmPwdRef.current.focus();
        return;
      }
      if (formData.userPwd !== formData.confirmPassword) {
        alert("비밀번호가 다릅니다. 확인해주세요.");
        confirmPwdRef.current.focus();
        return;
      }
    }

    console.log("Form Data Submitted:", formData);
    if (window.confirm("나의 정보를 수정하시겠습니까?")) {
      // 수정 api
      submitData(formData);
    }
  };
  const handleFormCancel = (e) => {
    e.preventDefault();
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
                  ref={deptRef} // ref 추가
                  onChange={handleInputChange}
                />
              </span>
            </div>
            <div className={styles.item_pd}>
              <span className={styles.tx}>비밀번호</span>
              <span className={styles.p_tx}>
                <input
                  type="password"
                  name="userPwd"
                  className={styles.txt}
                  value={formData.userPwd}
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
                  ref={confirmPwdRef} // ref 추가
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
