import prisma from '/lib/prisma';
import bcryptObj from "/lib/bcrypt";
export async function POST(req) {
  try {
    
    const data = await req.json();
    //console.log(data);

    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);

    if(data.params.main){

      const { userId, compCd, deptName, userName, userPwd, authCd, agrYn, regId } = data.params;

      const tbUser = await prisma.tbUser.create({
        data: {
          userId,
          compCd,
          deptName,
          userName,
          agrYn,
          regId,
          regDt : nowData,
        },
      });

      const tbLogin = await prisma.tbLogin.create({
        data: {
          userId,
          userPwd : bcryptObj.getEcrypt(userPwd),
          pwdWrongCnt : 0,
          regId,
          regDt : nowData,
        },
      });

      const tbAuthUser = await prisma.tbAuthUser.create({
        data: {
          authCd,
          userId,
          useYn,
          regId,
          regDt : nowData,
        },
      });

      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : tbUser}), {
        status: 200,
      })

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