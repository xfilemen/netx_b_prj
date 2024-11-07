import prisma from "@lib/prisma";
import bcryptObj from "@lib/bcrypt";
import {encrypt} from "@lib/crypto";

/**
 * @swagger
 * /user/regist:
 *   post:
 *     tags:
 *       - user
 *     summary: 계정생성 신청
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     description: CJ WORLD 계정
 *                   compCd:
 *                     type: string
 *                     description: 그룹사코드
 *                   deptName:
 *                     type: string
 *                     description: 소속명
 *                   userName:
 *                     type: string
 *                     description: 이름
 *                   mobileNum:
 *                     type: string
 *                     description: 휴대폰번호
 *                   userPwd:
 *                     type: string
 *                     description: 비밀번호
 *                   authCd:
 *                     type: string
 *                     description: 계정구분
 *                   agrYn:
 *                     type: string
 *                     description: 동의여부
 *                   authVerify:
 *                     type: string
 *                     description: 인증코드
 *     responses:
 *       200:
 *         description: 계정생성 신청
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const {params} = await req.json();
    const data = params?.data || params;
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowDate = new Date(currentTime[0].timezone);
    console.log(process.env.NEXTAUTH_SECRET);
    console.log("data", data);
    if (data) {
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
      } = data;

      

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
