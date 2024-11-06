import prisma from '/lib/prisma';
import {getRandomAuthNumber} from '@utils/common-util';
export async function POST(req) {
  try {
    const setTimeZone = await prisma.$queryRaw`SET TIME ZONE 'Asia/Seoul'`;
    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowDate = new Date(currentTime[0].timezone);

    const data = await req.json();
    if(data.params.data){
      const { reqdate, status, type, phone, callback, msg } = data.params.data;


      // 6자리 랜덤 숫자
      const ranNum = await getRandomAuthNumber();
      console.log(ranNum);

      if(phone.length == 11){
        const smsCode = await prisma.tbAuthSmsVerify.create({
          data: {
            authSmsCd : ranNum,
            regDt : nowDate,
            regId : phone,
          },
        });

        const callbackMsg = await prisma.smsMsg.create({
          data: {
            reqdate : nowDate,
            status : '1',
            type : '0',
            phone,
            callback : '15773400',
            msg : `[인증번호 : ${ranNum} ]`
          },
        });
  

  
        return new Response(JSON.stringify({message: '정상적으로 처리되었습니다.', 
                                            data : { authSmsId : smsCode?.authSmsId,
                                                     regId     : smsCode?.phone, }
                                          }), 
        {
          status: 200,
        })

      }else{
        throw new Error('휴대폰 번호 확인');
      }

    }else{
      throw new Error('param null');
    }
    
  } catch(err){
    console.log(err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}