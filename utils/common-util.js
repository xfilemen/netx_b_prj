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

export {getObjTrimAndNullProc};