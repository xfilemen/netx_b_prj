import timer from './timer';

/*
* object 내 데이터 trim, null 처리
*/
const getObjTrimAndNullProc = (obj) => {
    const result = {};
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      result[key] = typeof value === 'string' ? value.trim() || null : value;
    });
  
    return result;
}

// maxLength 처리
const maxLength = (e,maxLength,setValue,regexp) => {
  const cursorPosition = e.target.selectionStart;
  const value = (e.target.value).replace(regexp, '');
  if (value.length < maxLength) {
    setValue(value);
  } else {
    setValue(value.slice(0, maxLength));
    setTimeout(() => {
      e.target.selectionStart = cursorPosition <= maxLength ? cursorPosition : maxLength;
      e.target.selectionEnd = e.target.selectionStart;
    }, 0); 
  }
};

const getRandomAuthNumber = () => {
  const min = 100000; 
  const max = 999999; 
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}

const formErrorCheck = (errors,form) => {
  if (Object.keys(errors).length > 0) {
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
}

export {
  getObjTrimAndNullProc,
  maxLength,
  timer,
  getRandomAuthNumber,
  formErrorCheck
};