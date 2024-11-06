
import axios from 'axios';

const postData = async (url,paramObj) => {
    try {
      const response = await axios.post(url, {
        params: paramObj,
      });

      return response.data;

    } catch (error) {
        console.log(error);
        //alert(error.response.data.message || error.message);

        if(error.status == '440'){ // 세션 만료 시 로그인 페이지로 이동
            location.href = '/user/login';
        }
        return {
            message : error.response.data.message || error.message,
            status : error.status,
        };
    }
  };

const getData = async (url,paramObj) => {
  try {
    const response = await axios.get(url, {
      params: paramObj,
    });
    
    return response.data;

  } catch (error) {        

      //alert(error.response.data.message || error.message);
      if(error.status == '440'){ // 세션 만료 시 로그인 페이지로 이동
          location.href = '/user/login';
      }

      return {
          message : error.message,
          status : error.status
      };
  }
};

const fetchPostData = async (url,paramObj,customFunction) => {
  let error = {};
  let responseData = {};

  try {
    const response = await axios.post(url, {
      params: paramObj,
    });
    responseData = response.data;

  } catch (error) {
      console.log(error);
      //alert(error.response.data.message || error.message);

      if(error.status == '440'){ // 세션 만료 시 로그인 페이지로 이동
          location.href = '/user/login';
      }
      error = {
        message : error.response.data.message || error.message,
        code : error.response.data.code || '999',
        status : error.status,
      }
      if(error.code === '000'){
        alert(error.message);
      }else{
        alert("오류가 발생하였습니다");
      }
  }
  customFunction(responseData,error);

};
  
export default {postData,getData,fetchPostData};