import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { it, ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "@styles/datepicker-custom.css";
import CheckBox from "@components/checkbox";
import SelectBox from "@components/select";
import styles from "@styles/detail.module.css";
import Image from "next/image";

export default function FilterPage({ onClose, onSearch }) {
  const [statusCheckedValues, setStatusCheckedValues] = useState([]);
  const [typeCheckedValues, setTypeCheckedValues] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reqTypeText, setReqTypeText] = useState("");
  const [selectType, setSelectType] = useState("");

  const initSearchForm = () => {
    setStatusCheckedValues([]);
    setTypeCheckedValues([]);
    setStartDate(null);
    setEndDate(null);
    setReqTypeText("");
    setSelectType("");
  };

  const handelSearch = () => {
    if (selectType && selectType.trim()) {
      if (!reqTypeText || !reqTypeText.trim()) {
        alert("업무명을 입력해주세요.");
        return;
      }
    }

    const searchData = {
      reqStatus: statusCheckedValues,
      reqType: typeCheckedValues,
      startRegDt: startDate,
      endRegDt: endDate,
      selectType,
      reqTypeText,
    };

    onSearch(searchData);
    onClose();
  };

  const stateChk = [
    { label: "전체", name: "1", id: "all", value: "all" },
    { label: "접수", name: "2", id: "register", value: "register" },
    { label: "진행", name: "3", id: "progress", value: "progress" },
    { label: "취소", name: "4", id: "cancel", value: "cancel" },
    { label: "반려", name: "5", id: "return", value: "return" },
    { label: "완료", name: "6", id: "complete", value: "complete" },
  ];

  const typeChk = [
    { label: "전체 ", name: "7", id: "typeall", value: "all" },
    { label: "정규", name: "8", id: "regular", value: "정규직" },
    { label: "BP", name: "9", id: "BP", value: "BP" },
  ];

  const reqType = [
    { label: "업무명", value: "reqName" },
    // { value: "11", label: "전체" },
    // { value: "33", label: "내용" },
    // { value: "44", label: "처리자명" },
  ];

  useEffect(() => {}, [
    statusCheckedValues,
    typeCheckedValues,
    startDate,
    endDate,
    reqTypeText,
    selectType,
  ]);

  // 진행상태 변경
  const handleStatusCheckboxChange = (value) => {
    if (value === "all") {
      setStatusCheckedValues((prevState) => {
        // "all"이 이미 체크되어 있으면 전체 선택을 해제하고, 아니면 전체 선택을 설정
        return prevState.includes("all")
          ? [] // 전체 해제
          : stateChk.map((item) => item.value); // 모든 value를 포함한 리스트 반환
      });
    } else {
      // 특정 체크박스를 개별적으로 체크하거나 해제할 때
      setStatusCheckedValues((prevState) => {
        if (prevState.includes(value)) {
          // 체크박스 해제 시 해당 값을 제거
          const updatedValues = prevState.filter((item) => item !== value);

          // 만약 "all"이 선택된 상태에서 일부 항목을 해제했다면, "all"도 제거
          return updatedValues.includes("all")
            ? updatedValues.filter((item) => item !== "all")
            : updatedValues;
        } else {
          // 체크박스 체크 시 해당 값을 추가
          const updatedValues = [...prevState, value];

          // 모든 상태가 선택된 경우, "all"을 추가
          return updatedValues.length === stateChk.length - 1
            ? [...updatedValues, "all"]
            : updatedValues;
        }
      });
    }
  };

  // 유형 변경
  const handleTypeCheckboxChange = (value) => {
    if (value === "all") {
      setTypeCheckedValues((prevState) => {
        // "all"이 이미 체크되어 있으면 전체 선택을 해제하고, 아니면 전체 선택을 설정
        return prevState.includes("all")
          ? [] // 전체 해제
          : typeChk.map((item) => item.value); // 모든 value를 포함한 리스트 반환
      });
    } else {
      // 특정 체크박스를 개별적으로 체크하거나 해제할 때
      setTypeCheckedValues((prevState) => {
        if (prevState.includes(value)) {
          // 체크박스 해제 시 해당 값을 제거
          const updatedValues = prevState.filter((item) => item !== value);

          // 만약 "all"이 선택된 상태에서 일부 항목을 해제했다면, "all"도 제거
          return updatedValues.includes("all")
            ? updatedValues.filter((item) => item !== "all")
            : updatedValues;
        } else {
          // 체크박스 체크 시 해당 값을 추가
          const updatedValues = [...prevState, value];

          // 모든 상태가 선택된 경우, "all"을 추가
          return updatedValues.length === typeChk.length - 1
            ? [...updatedValues, "all"]
            : updatedValues;
        }
      });
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear(); // 년도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 1 더해줌)
    const day = String(date.getDate()).padStart(2, "0"); // 일

    return `${year}-${month}-${day}`; // 형식: yyyy-mm-dd
  };

  return (
    <div className={styles.pop_content}>
      <div className={styles.header}>
        Filter
        <a onClick={onClose}>
          <Image
            src="/images/detail/ico_black_close.png"
            alt="닫기"
            width={24}
            height={24}
          />
        </a>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <p className={styles.tx}>진행상태</p>
          <div className={styles.chk_area}>
            {stateChk.map((item) => (
              <CheckBox
                key={item.name}
                label={item.label}
                id={item.id}
                name="reqStatus"
                checked={statusCheckedValues.includes(item.value)} // 체크 상태
                onChange={() => handleStatusCheckboxChange(item.value)} // 상태 업데이트
              />
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.tx}>유형</p>
          <div className={styles.chk_area}>
            {typeChk.map((item) => (
              <CheckBox
                key={item.name}
                label={item.label}
                id={item.id}
                name="reqType"
                checked={typeCheckedValues.includes(item.value)} // 체크 상태
                onChange={() => handleTypeCheckboxChange(item.value)} // 상태 업데이트
              />
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.tx}>
            기간 <span>요청일 기준</span>
          </p>
          <div className={styles.picker}>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              locale={ko}
              placeholderText="시작일"
              className={styles.calendar}
              name="reqInDt"
              selected={startDate}
              onChange={(date) => {
                const newDate = formatDate(date);
                setStartDate(newDate);
              }}
            />
            <span className={styles.dash_line}>-</span>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              locale={ko}
              placeholderText="종료일"
              className={styles.calendar}
              name="reqOutDt"
              selected={endDate}
              onChange={(date) => {
                const newDate = formatDate(date);
                setEndDate(newDate);
              }}
            />
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.tx}>내용</p>
          <div className={styles.select_box}>
            <SelectBox
              options={reqType}
              name="reqType"
              onChange={(e) => setSelectType(e.target.value)}
            />
            <input
              type="text"
              name="reqTypeText"
              className={styles.txt}
              value={reqTypeText}
              onChange={(e) => {
                setReqTypeText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.btn_section}>
          <button onClick={initSearchForm} className={styles.reset_btn}>
            초기화
          </button>
          <button onClick={handelSearch} className={styles.search_btn}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
}
