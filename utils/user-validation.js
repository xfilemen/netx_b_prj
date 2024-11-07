
// 이름 validation
const nameValid = () => ({
    required: "이름을 입력해주세요",
    validate: (value) => {
        new TextEncoder().encode(value).length <= 50 || "이름은 최대 50바이트까지 등록 가능합니다";
        const trimValue = value.trim();
        if (trimValue === '') {
            return "이름을 입력해주세요";
        }
        return true;
    },    
    pattern: { 
        value: /^[A-Za-z\u4e00-\u9fa5\uac00-\ud7af0-9\s]+$/,
        message: "영문대/소문자, 국문, 중문, 공백만 입력 가능합니다"
    },
      
});
  
// 비밀번호 validation
const passwordValid = () => ({
    required: "비밀번호를 입력해주세요",
    minLength: {
        value: 8,
        message: "비밀번호는 8~12자 사이로 입력해야 합니다",
    },
    maxLength: {
        value: 12,
        message: "비밀번호는 8~12자 사이로 입력해야 합니다",
    },
    // pattern: { 
    //     value: /^(?=.*[a-zA-Z])(?=.*[0-9])\S+$/,
    //     message: "비밀번호는 영문자와 숫자를 포함해야하고 공백은 입력할 수 없습니다"
    //   },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])\S+$/,
        message: "영문 대/소문자, 숫자, 특수문자 모두 최소 1가지 이상 조합해야 하고 공백은 입력할 수 없습니다",
    },
});

// 휴대폰번호 validation
const mobNumValid = (length) => ({
    required: "휴대폰번호를 입력해주세요",
    maxLength: {
        value: length,
        message: `휴대폰번호는 ${length}자리를 입력해야 합니다`,
    },
    minLength: {
        value: length,
        message: `휴대폰번호는 ${length}자리를 입력해야 합니다`,
    },
    pattern: {
        value: /^010\d{7,8}$/,
        message: "휴대폰번호는 010으로 시작하는 11자리 숫자만 입력할 수 있습니다",
    },
});

// 소속 validation
const deptValid = (length) => ({
    required: "소속을 입력해주세요",
    maxLength: {
        value: length,
        message: `소속은 ${length}자리까지 입력 가능합니다`,
    },
});

// required
const required = (name) => ({
    required: msgObj[name] || '입력 누락된 항목이 있습니다.',
    validate: (value) => {
        const trimValue = value.trim();
        if (trimValue === '') {
          return msgObj[name];
        }
        return true;
    },
});

// 일치여부 validation
const matchValid = (name,targetValue) => ({
    validate: (value) =>  value === targetValue || (msgObj[name] || "값이 일치하지 않습니다"),
});

const msgObj = {
    userId : "CJ WORLD ID를 입력해주세요",
    compCd : "그룹사를 선택해주세요",
    deptName : "소속을 입력해주세요",
    authCd : "계정구분을 선택해주세요",
    agrYn : "서약서에 동의하지 않은 경우, 계정생성이 불가합니다.",
    userPwd2 : "비밀번호가 일치하지 않습니다",
}


export {
    nameValid,
    passwordValid,
    mobNumValid,
    required,
    matchValid
};