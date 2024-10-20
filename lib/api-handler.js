
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

        if(error.status == '401'){ // 세션 만료 시 로그인 페이지로 이동
            console.log(error);
            alert(11);
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
        if(error.status == '401'){ // 세션 만료 시 로그인 페이지로 이동
            location.href = '/user/login';
        }

        return {
            message : error.message,
            status : error.status
        };
    }
  };
  
export default {postData,getData};