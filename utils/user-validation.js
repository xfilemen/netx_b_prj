
// 이름 validation
const nameValid = () => ({
    required: "이름을 입력해주세요",
    validate: (value) =>
      new TextEncoder().encode(value).length <= 50 || "이름은 최대 50바이트까지 등록 가능합니다",
});
  
// 비밀번호 validation
const passwordValid = () => ({
    required: "비밀번호를 입력해주세요",
    minLength: {
        value: 10,
        message: "비밀번호는 최소 10자리 이상이어야 합니다",
    },
    pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/,
        message: "비밀번호는 영문자와 숫자를 포함해야 합니다."
      },
    // pattern: {
    //     value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{10,}$/,
    //     message: "비밀번호는 영문, 숫자, 특수문자(~!@#$%^&*)를 포함해야 합니다",
    // },
});

// 휴대폰번호 validation
const mobNumValid = (length) => ({
    required: "휴대폰번호를 입력해주세요",
    maxLength: {
        value: length,
        message: `${length}자리까지 가능합니다`,
    },
    pattern: {
        value: /^[0-9]+$/,
        message: "휴대폰번호는 숫자만 입력할 수 있습니다",
    },
});

// required
const required = (name) => ({
    required: msgObj[name] || '입력 누락된 항목이 있습니다.',
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
    agrYn : "약관에 동의해야만 신청이 가능합니다",
    userPwd2 : "비밀번호가 일치하지 않습니다",
}


export {
    nameValid,
    passwordValid,
    mobNumValid,
    required,
    matchValid
};