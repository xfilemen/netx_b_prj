import SelectBox from '@components/select';
import styles from '@styles/modal.module.css';
import React, { useEffect,useState } from 'react';
import { useForm } from "react-hook-form";
import {nameValid,passwordValid,mobNumValid,required,matchValid} from '@utils/user-validation';
import {maxLength,timer} from '@utils/common-util';
import apiHandler from '@utils/api-handler';

export default function AuthForm({ type,closeModal }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { register, handleSubmit, watch , getValues, setValue, control, formState: { errors }} = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const { time, start, stop, reset, remove, isActive } = timer("03:00");
  const [authData, setAuthData] = useState({});
  const [isAuthDisabled, setIsAuthDisabled] = useState(false);

  const [groupType, setGroupType] = useState([
    // { value: 'U001', label: '디아이웨어' },
    // { value: 'U002', label: 'CJ 올리브네트웍스' },
  ]);

  const [accountType, setAccountType] = useState([
    { value: 'request', label: '요청자' },
    { value: 'approve', label: '승인자' },
  ]);



  //인증번호 발송
  const authCodeSend = async () => {
    const mobileNum = watch("mobileNum");

    if(mobileNum.length !== 11){
      console.log(mobileNum.length);
      alert("휴대폰번호를 입력하세요 ");
      return;
    }
    await apiHandler.fetchPostData('/api/user/auth/sms/send',{
      data :{
        serialnum : '',
        status : '',
        type : '',
        phone : mobileNum,
        callback : '',
        msg : ''
      }
      },
      (result,error)=>{
        if(result.data?.authSmsId){
          alert("인증번호가 발송되었습니다");
          console.log(result.data.authSmsId);
          setAuthData(result.data);
          setIsVisible(true);
          reset();
          start();
        }
      }
    );
  };

  //인증번호 확인
  const authCodeVerify = async () => {
    const authSmsCd = watch("authSmsCd");
    await apiHandler.fetchPostData('/api/user/auth/sms/verify',{
       data :{
          ...authData,
          authSmsCd
        }
      },
      (result,error)=>{
        console.log(result,error)
        if(result.data?.authSmsStatus == '001'){
          setValue("authVerify",authSmsCd);
          setIsAuthDisabled(true);
          remove();
          alert("인증이 완료되었습니다");
        }
      }
    );
  };

  //계성생성 신청
  const onSubmit = async (data) => {
    let userCount = 1;
    const userId = watch("userId");
    //계정 중복 여부
    await apiHandler.fetchPostData('/api/user/find/id',{
      data : {userId}
      },
      (result,error)=>{
        console.log(result);
        userCount = result.data?.userCount;
        if(userCount !== 0){
          alert("이미 사용 중인 계정입니다. CJ World 계정 확인 후, 다시 입력해 주세요.");
        }
      }
    );
    
    if (userCount === 0 && window.confirm("계정 생성을 요청하시겠습니까?")) {
      console.log("폼 데이터:", data);
      await apiHandler.fetchPostData('/api/user/regist',{
        data : data
        },
        (result,error)=>{
          console.log(result);
          if(result.data?.proc === 'success'){
            alert("계정 생성 요청이 완료되었습니다");
            closeModal();
          }
        }
      );
    };
  };

  //validation 체크
  const onError = () => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      const form = document.getElementById("form1");
      const formData = new FormData(form);
      let itemKey = new Array();
      formData.forEach((value, key) => {
        itemKey.push(key);
      });
      itemKey.push('agrYn');
      for(const item of itemKey){
        const errror = errors[item];
        if(errror?.message){
          alert(errror.message);
          return;
        }
      }
    }
  };

  // 그룹사 코드 호출
  const codeSelect = async () => {
    await apiHandler.fetchPostData('/api/common/code/select',{
        codeGrp : 'G001',
      },
      (result,error)=>{
        if(result.data){
          let groupType = result.data.map(item => ({
            value: item.code,
            label: item.codeName
          }));
          setGroupType(groupType);
        }else{
          console.log(result.data);
        }
      }
    );
  };

  const canCelBtnClick = () => {
    if (window.confirm("입력하신 내용이 초기화됩니다. 그래도 취소하시겠습니까?")) {
      closeModal();
    };
  }
  
  
  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(function() {
    codeSelect();
  }, []);

    return (
      <form id="form1" onSubmit={handleSubmit(onSubmit,onError)}>
           {type === 'requestAccount' && (
            <div className={styles.req_cont}>
                <h2>계정생성요청</h2>
                <div className={styles.area}>
                  <div className={styles.item_half_left}>
                      <label>계정구분</label>
                      <SelectBox register={register("authCd", required("authCd"))} options={accountType} name="authCd"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>이름</label>
                      <input {...register("userName", nameValid())} type="text" autoComplete="new-username" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>그룹사</label>
                      <SelectBox register={register("compCd", required("compCd"))} options={groupType} name="compCd"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>소속</label>
                      <input {...register("deptName", required("deptName"))} type="text" placeholder="ex. 테이터 마케팅팀" autoComplete="new-group" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>비밀번호</label>
                      <input {...register("userPwd", passwordValid())} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_right}>
                      <label>비밀번호 확인</label>
                      <input {...register("userPwd2", matchValid("userPwd2",getValues("userPwd")))} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>CJ WORLD ID</label>
                      <input {...register("userId", required("userId"))} type="text" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>휴대폰번호</label>
                      <input {...register("mobileNum", mobNumValid(11))} type="number" onKeyDown={(e) => maxLength(e,11)} className={styles.txt} />
                      <span className={styles.certify_aply_btn}>
                        <button type="button" onClick={authCodeSend} disabled={isAuthDisabled}>인증번호 발송</button>
                      </span>
                  </div>
                  <div className={styles.item} style={{ display: isVisible ? "block" : "none" }}>
                      <label>인증번호</label>
                      <input {...register("authSmsCd")} type="text" className={styles.txt} disabled={isAuthDisabled} />
                      <span className={styles.certify_num}>{time}</span>
                      <span className={styles.certify_btn}>
                        <button type="button" onClick={authCodeVerify} disabled={isAuthDisabled}>{isAuthDisabled ? "인증완료" : "인증"}</button>
                        <input {...register("authVerify")} type="hidden" className={styles.txt} />
                      </span>
                  </div>
                </div>
                <div className={styles.info_tx}>
                  <ul>
                    <li><span className={styles.bul_dot}></span>회사의 업무용 시스템(PC자산 포함)은 업무 목적에 한정하여 사용함을 원칙으로 한다.</li>
                    <li><span className={styles.bul_dot}></span>업무용 시스템을 사용함에 있어서는 회사의 규정을 준수하고, CJ 구성원의 사생활과 명예를 존중하는 방식으로 올바르게 사용하여야 한다.</li>
                    <li><span className={styles.bul_dot}></span>패스워드는 타인에게 노출되지 않도록 안전하게 관리하여야 한다.</li>
                    <li><span className={styles.bul_dot}></span>별도의 허가 및 부득이한 사유 없이 타인의 PC 및 타인의 계정을 이용하지 않아야 한다.</li>
                    <li><span className={styles.bul_dot}></span>사내망을 통해 다른 직원의 PC에 임의로 접근하여, 파일을 열람, 변조, 삭제하지 않아야 한다.</li>
                    <li><span className={styles.bul_dot}></span>회사는 정보자산의 보호 및 부정행위 예방/대응을 위하여 임직원의 회사 업무용 시스템 사용 내역을 기록하고 모니터링 할 수 있다.</li>
                  </ul>
                  <p className={styles.chk_p}>
                    <input {...register("agrYn", matchValid("agrYn","Y"))}  type="checkbox" value='Y' className={styles.chk_box}/>
                    본인은 상기 내용을 준수하고 동의합니다.
                  </p>
                </div>
                <div className={styles.btn_section}>
                  <button className={styles.aply_btn}>확인</button>
                  <button type='button' className={styles.cancel_btn} onClick={canCelBtnClick}>취소</button>
                </div>
            </div>
        )}
        {type === 'findPassword' && (
         <div className={`${styles.req_cont} ${styles.resize}`}>
            <h2>비밀번호 찾기</h2>
            <div className={styles.area}>
              <div className={styles.item}>
                <label>이름</label>
                <input type="text" className={styles.txt_input} />
              </div>
              <div className={styles.item}>
                <label>CJ World ID</label>
                <input type="text" className={styles.txt_input} />
              </div>
              <div className={styles.item}>
                <label>휴대폰번호</label>
                <input type="text" className={styles.txt_input} />
                <span className={styles.certify_aply_btn}>
                  <button type="button" onClick={authCodeSend}>인증번호 발송</button>
                </span>
              </div>
              <div className={styles.item}>
                <label>인증번호</label>
                <input type="text" className={styles.txt_input} />
                <span className={styles.certify_num}>{time}</span>
                <span className={styles.certify_btn}>                
                <button type="button" onClick={authCodeVerify} disabled={isAuthDisabled}>{isAuthDisabled ? "인증완료" : "인증"}</button>
                        <input {...register("authVerify")} type="hidden" className={styles.txt} />
                </span>
              </div>
            </div>
            <div className={styles.btn_section}>
              <button className={styles.aply_btn}>확인</button>
              <button type='button' className={styles.cancel_btn} onClick={closeModal}>취소</button>
            </div>
          </div>
        )}
      </form>
    );
  }