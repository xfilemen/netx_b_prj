import prisma from "@lib/prisma";
import bcryptObj from "@lib/bcrypt";
import {encrypt} from "@lib/crypto";
export async function POST(req) {
  try {
    const data = await req.json();
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowDate = new Date(currentTime[0].timezone);
    console.log(process.env.NEXTAUTH_SECRET);
    console.log("data", data);
    if (data.params) {
      const {
        userId,
        compCd,
        deptName,
        userName,
        mobileNum,
        userPwd,
        userPwd2,
        authCd,
        agrYn,
        authSmsCd,
        authVerify,
      } = data.params.data;

      

      await prisma.$transaction(async (prisma) => {
          
        const smsCode = await prisma.tbAuthSmsVerify.findMany({
          where : {
                   regId : mobileNum,
                   authSmsCd : authVerify,
                   authSmsStatus : '001'
                  }
        })
        console.log('userId',userId,authVerify);
        console.log('smsCode',smsCode);
        if(smsCode.length === 0){
          throw new Error("인증이 완료되지 않았습니다.");
        }



          const tbUser = await prisma.tbUser.create({
            data: {
              userId,
              compCd,
              deptName,
              userName,
              mobileNum : await encrypt(mobileNum,process.env.NEXTAUTH_SECRET),
              agrYn,
              regId : userId,
              regDt : nowDate,
            },
          });

          const tbLogin = await prisma.tbLogin.create({
            data: {
              userId,
              userPwd: bcryptObj.getEcrypt(userPwd),
              pwdWrongCnt: 0,
              regId : userId,
              regDt: nowDate,
            },
          });

          const tbAuthUser = await prisma.tbAuthUser.create({
            data: {
              authCd,
              userId,
              regId : userId,
              regDt: nowDate,
            },
          });
      });

      
      return new Response(
        JSON.stringify({ message: "정상적으로 처리되었습니다.", data: {proc : 'success'} }),
        {
          status: 200,
        }
      );

    } else {
      throw new Error("param null");
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ code:'000', message: err.message }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
