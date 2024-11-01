import SelectBox from './select';
import styles from '../styles/modal.module.css';
import { useForm , useFieldArray } from "react-hook-form";

export default function AuthForm({ type }) {
    const { register, handleSubmit, watch , control, formState: { errors }} = useForm({
      defaultValues: { items: [{ test: "", test2: "" }] },
    });
    const { 
      fields,
      append,
      remove,
      update,
   } = useFieldArray({
      control,
      name: "items", // 배열 필드 이름
    });

    //항목 추가
    const onAppend = () => {
      append({ test: '', test2: '' }); 
    };

    //항목 값 수정
    const onUpdate = (index, field, value) => {
      control.setValue(`items.${index}.${field}`, value);
    };
    

    //항목 삭제
    const onRemove = (index) => {
      remove(index); 
    };
    

  
    //form submit
    const onSubmit = (data) => {
      console.log("폼 데이터:", data);
      console.log(errors);
    };

  //validation 체크
  const onError = () => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors) 
                                  .map(error => error.message) 
                                  .join(','); 
      alert(`${errorMessages}이 누락되었습니다.`);
    }
  };

  //숫자만 입력
  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace'&& e.key !== 'Delete') {
        e.preventDefault();
    }
  };

    const accountType = [
        { value: '1', label: '요청자' },
        { value: '2', label: '신청자' },
    ];  

    const groupType = [
        { value: '1', label: '디아이웨어' },
        { value: '2', label: 'CJ 올리브네트웍스' },
    ];
    return (
      <form onSubmit={handleSubmit(onSubmit,onError)}>
           {type === 'requestAccount' && (
            <div className={styles.req_cont}>
                <h2>계정생성요청</h2>
                <div className={styles.area}>
                  <div className={styles.item_half_left}>
                      <label>계정구분</label>
                      <SelectBox register={register("accountType")} options={accountType} name="accountType"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>이름</label>
                      <input {...register("name", { required: {value : true, message : '이름' } })} type="text" autoComplete="new-username" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>그룹사</label>
                      <SelectBox register={register("groupType")} options={groupType} name="groupType"/>
                  </div>
                  <div className={styles.item_half_right}>
                      <label>소속</label>
                      <input {...register("group", { required: {value : true, message : '소속' } })} type="text" placeholder="ex. 테이터 마케팅팀" autoComplete="new-group" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_left}>
                      <label>비밀번호</label>
                      <input {...register("password")} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item_half_right}>
                      <label>비밀번호 확인</label>
                      <input {...register("password2")} type="password" autoComplete="new-password" className={styles.txt} />
                  </div>
                  <div className={styles.item}>
                      <label>휴대폰번호</label>
                      <input {...register("p_num1")} type="number" maxLength={3} className={styles.num} onKeyDown={handleKeyDown} />
                      <span className={styles.line}>-</span>
                      <input {...register("p_num2")} type="number" maxLength={4} className={styles.num} onKeyDown={handleKeyDown} />
                      <span className={styles.line}>-</span>
                      <input {...register("p_num3")} type="number" maxLength={4} className={styles.num} onKeyDown={handleKeyDown} />
                      <span className={styles.certify_aply_btn}>
                        <button>인증번호 발송</button>
                      </span>
                  </div>
                  
                  {fields.map((field, index) => (
                      <div key={field.id} className={styles.item_half_left}>
                          <label>테스트</label>
                          <SelectBox 
                          register={register(`items.${index}.test`)} 
                          defaultValue={field.test} 
                          options={groupType} 
                          name={`items.${index}.test`}/>
                          <input {...register(`items.${index}.test2`)} type="text" autoComplete="test2" className={styles.txt} />
                      </div>
                  ))}
                  </div>
                  <div className={styles.item}>
                      <label>인증번호</label>
                      <input type="text" className={styles.txt} />
                      <span className={styles.certify_num}>03:00</span>
                      <span className={styles.certify_btn}>
                        <button>인증</button>
                      </span>
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
                    <input {...register("agree")}  type="checkbox" className={styles.chk_box}/>
                    본인은 상기 내용을 준수하고 동의합니다.
                  </p>
                </div>
                <div className={styles.btn_section}>
                  <button className={styles.aply_btn}>확인</button>
                  <button className={styles.cancel_btn}>취소</button>
                <button    type="button"    onClick={onAppend} > 항목 추가 </button>
                </div>
            </div>
        )}
        {type === 'findPassword' && (
         <div className={`${styles.req_cont} ${styles.resize}`}>
            <h2>비밀번호 찾기</h2>
            <div className={styles.section}>
              <div className={styles.item}>
                <label>소속</label>
                <input type="text" className={styles.txt} />
              </div>
            </div>
          </div>
        )}
      </form>
    );
  }