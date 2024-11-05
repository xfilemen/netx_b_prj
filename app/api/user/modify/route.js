import prisma from "@lib/prisma";
import bcryptObj from "@lib/bcrypt";
import {setSessionUpdate} from "@utils/data-access";
export async function POST(req) {
  try {
    const data = await req.json();

    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    if (data.params) {
      const {
        userId,
        compCd,
        deptName,
        userName,
        userPwd,
        authCd,
        agrYn,
        modId,
      } = data.params;

      const tbUser = await prisma.tbUser.update({
        where: { userId },
        data: {
          compCd,
          deptName,
          modId,
          modDt: nowData,
        },
      });

      if (userPwd) {
        const tbLoginOne = await prisma.tbLogin.findMany({
          where: {
            userId,
          },
        });

        const tbLogin = await prisma.tbLogin.update({
          where: {
            userId_seq: {
              userId: tbUser.userId,
              seq: tbLoginOne[0].seq,
            },
          },
          data: {
            userPwd: bcryptObj.getEcrypt(userPwd),
            modId,
            modDt: nowData,
          },
        });
      }

      //세션 갱신 데이터
      const retData = await setSessionUpdate(req);

      return new Response(
        JSON.stringify({ message: "정상적으로 처리되었습니다.", data: retData }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("param null");
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "오류 발생" }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
