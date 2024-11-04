import timer from './timer';

/*
* object 내 데이터 trim, null 처리
*/
function getObjTrimAndNullProc(obj) {
    const result = {};
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      result[key] = typeof value === 'string' ? value.trim() || null : value;
    });
  
    return result;
  }

// maxLength 처리
const maxLength = (e,maxLength) => {
  const allowKey = ["Enter", "Backspace", "Tab", "Shift", "Control", "Alt", "Del", "CapsLock"];
  const newLength = e.target.value.length + e.key.length;
  if (!allowKey.includes(e.key) && newLength > maxLength) {
    console.log(`newLength : ${newLength}, maxLength : ${maxLength}`);
    e.preventDefault();
  }
};

export {getObjTrimAndNullProc,maxLength,timer};