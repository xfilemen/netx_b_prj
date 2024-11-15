"use client";

import React, { useEffect, useRef, useState } from "react";

import RegDetail from "../detail/regReqDetail.jsx";
import Filter from "@components/filter";
import styles from "@styles/detail.module.css";
import Image from "next/image";
import apiCall from "../../utils/api-call";
import { useSession, signIn, signOut } from "next-auth/react";

export default function RegularPage({ item }) {
  const [listSelectIdx, setListSelectIdx] = useState(0); // li on 포커스
  const [pageSelectItem, setPageSelectItem] = useState(null); // 정규인력 요청·내역 상세페이지 연결
  const [isFilterVisible, setFilterVisible] = useState(false); // 토글 상태 관리
  // 필터 데이터
  const [filterData, setFilterData] = useState({
    reqStatus: [],
    startRegDt: "",
    endRegDt: "",
    reqType: [],
    selectType: "",
    reqTypeText: "",
  });

  const handleSearch = (searchPram) => {
    setFilterData({
      ...searchPram,
    });
    // 목록 조회
    getData("/api/req/list", searchPram);
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const isGetData = useRef(false);

  const [typeData, setTypeData] = useState("");

  const [_, forceRender] = useState(0);

  const showDetailPage = (index, item) => {
    setListSelectIdx(index);
    setPageSelectItem(item);
    console.log(index, item);
    setIsEditing(false);
  };

  const { data: session } = useSession();
  let userInfo = {};
  userInfo = session?.user || {};

  console.log("userInfo: ", userInfo);
  console.log("📢 [page.jsx:29]", session);

  const getData = async (url, search) => {
    // 필터 추가
    const reqFilterData = {
      ...search,
    };

    console.log("📢 [page.jsx:26]", url);
    const result = await apiCall.postData(url, reqFilterData); // POST 요청
    console.log("요청 전체 조회 : ", result.data);

    if (result.data) {
      for (let index = 0; index < result.data.length; index++) {
        let typeData2 = "";
        if (result.data[index].reqDet.length > 0) {
          for (
            let index2 = 0;
            index2 < result.data[index].reqDet.length;
            index2++
          ) {
            console.log(
              "📢 [page.jsx:37]** 확인 :: ",
              result.data[index].reqDet[index2].reqType
            );
            if (
              result.data[index].reqDet[index2].reqType.includes("BP") &&
              result.data[index].reqDet[index2].reqType.includes("정규직")
            ) {
              result.data[index].reqDet[index2].reqType = "정규직, BP";

              typeData2 = typeData2 + "정규직, BP";
            } else if (
              result.data[index].reqDet[index2].reqType.includes("BP")
            ) {
              typeData2 = typeData2 + "BP";
            } else if (
              result.data[index].reqDet[index2].reqType.includes("정규직")
            ) {
              typeData2 = typeData2 + "정규직";
            }
            console.log(
              "📢 [page.jsx:37]** 확인2 :: ",
              result.data[index].reqDet[index2].reqType
            );
          }
        }

        if (typeData2.includes("BP") && typeData2.includes("정규직")) {
          result.data[index].reqType2 = "정규직, BP";
        } else if (typeData2.includes("BP")) {
          result.data[index].reqType2 = "BP";
        } else if (typeData2.includes("정규직")) {
          result.data[index].reqType2 = "정규직";
        }
      }

      if (
        reqFilterData.reqType.length > 0 &&
        !reqFilterData.reqType.includes("all")
      ) {
        result.data = result.data.filter(
          (item) => item.reqType2 == reqFilterData.reqType[0]
        );
      }

      setData(result.data);
      isGetData.current = true;
    }

    // ++isGetData.current;
  };

  const getStatusText = (status) => {
    switch (status) {
      case "register":
        return "접수";
      case "progress":
        return "진행";
      case "cancel":
        return "취소";
      case "return":
        return "반려";
      case "complete":
        return "완료";
      default:
        return status; // 다른 상태는 원래 값을 사용
    }
  };

  const getStatusClass = (status) => {
    return styles[status] || "";
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(function () {
    console.log("API 호출");
    getData("/api/req/list", filterData);
  }, []);

  useEffect(
    function () {
      console.log("📢 [page.jsx:56]", data);
    },
    [data]
  );

  useEffect(
    function () {
      console.log("📢 ", filterData);
    },
    [filterData]
  );

  const handleEditClick = async (param) => {
    let msg = "수정";
    let logDesc = "";
    if (param == "cancel") {
      msg = "요청취소";
      logDesc = "정규 인력 요청 취소";
    } else if (param == "return") {
      msg = "반려처리";
      logDesc = "정규 인력 요청 반려";
    } else if (param == "complete") {
      msg = "완료처리";
      logDesc = "정규 인력 요청 완료";
    } else if (param == "register") {
      msg = "요청재개";
      logDesc = "정규 인력 요청 재개";
    } else if (param == "progress") {
      msg = "진행처리";
      logDesc = "정규 인력 요청 진행";
    }
    if (confirm(`${msg} 하시겠습니까?`) == true) {
      //확인

      if (param == "Edit") {
        setIsEditing(true);
      } else {
        console.log("📢 [page.jsx:109]", pageSelectItem);
        pageSelectItem.reqStatus = param;
        pageSelectItem.reqLogDesc = logDesc;
        pageSelectItem.userId = userInfo.userId;
        if (userInfo.authCd === "approve")
          pageSelectItem.confId = userInfo.userId;
        await modiApi();
        //await addLog();
        forceRender((prev) => prev + 1); // 상태 값을 변경하여 강제 렌더링
      }
      console.log("📢 [regReqDetail.jsx:56]", param);
    } else {
      //취소

      return true;
    }
  };

  const [isEditing, setIsEditing] = useState(false); // 수정 상태 변경

  const modiApi = async () => {
    console.log("📢 [page.jsx:104]", pageSelectItem);
    const result = await apiCall.postData("/api/req/modify", {
      data: pageSelectItem,
    }); // POST 요청
    console.log("reqRegist : ", result);
  };

  // const addLog = async () => {
  //   const result1 = await apiCall.postData("/api/req/log/regist", {
  //     data: logData, // 로그 데이터 입력
  //   });
  //   console.log("📢 [page.jsx:175]", result1);
  // };

  useEffect(() => {
    console.log("📢 [page.jsx:129]", pageSelectItem);
  }, [pageSelectItem]);

  // useEffect(() => {
  //   console.log("📢 [page.jsx:129]logData:: ", logData);
  //   addLog();
  // }, [logData]);

  useEffect(() => {
    if (data.length > 0) {
      setListSelectIdx(0);
      setPageSelectItem(data[0]); // 첫 번째 항목을 선택된 페이지로 설정
    }
  }, [data]);

  const handleFilterToggle = () => {
    setFilterVisible(!isFilterVisible); // 클릭 시 토글
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
        <div className={styles.left_section}>
          <div className={styles.title}>
            <div className={styles.tx}>
              <h2>인력 요청·내역</h2>
              <p className={styles.tit_tx}>요청 내역을 확인하실 수 있습니다.</p>
            </div>
            {isGetData.current}
            <div className={styles.btn}>
              <button onClick={handleFilterToggle}>Filter</button>
            </div>
            {isFilterVisible && (
              <div>
                <Filter onSearch={handleSearch} onClose={handleFilterToggle} />
                <div className={styles.dim}></div>
              </div>
            )}
          </div>
          <div className={styles.item_list}>
            <div className={styles.list_items}>
              <ul>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <li
                      key={item.id}
                      onClick={() => showDetailPage(index, item)}
                      className={`${listSelectIdx === index ? styles.on : ""}`}
                    >
                      <div
                        className={`${styles.state} ${getStatusClass(
                          item.reqStatus
                        )}`}
                      >
                        {getStatusText(item.reqStatus)}
                      </div>
                      <div className={styles.section}>
                        <p className={styles.tit_tx}>{item.reqTitle}</p>
                        <div className={styles.tx_info}>
                          <span className={styles.priority}>
                            유형 : {item.reqType2}
                          </span>
                          <span className={styles.blt}>•</span>
                          <span className={styles.date}>
                            요청일 {item.regDt.substring(0, 10)}
                          </span>
                          <span className={styles.blt}>•</span>
                          <span className={styles.num}>
                            요청인원 {item.reqHeadcount}명
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : isGetData.current ? (
                  <li className={styles.nodata}>데이터가 없습니다.</li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.right_section}>
          <RegDetail
            item={pageSelectItem}
            userInfo={userInfo}
            handleEditClick={handleEditClick}
            isEditing={isEditing}
            initialValue={pageSelectItem}
          />
        </div>
      </div>
    </div>
  );
}
