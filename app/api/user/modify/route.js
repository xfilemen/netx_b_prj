import prisma from "@lib/prisma";
import bcryptObj from "@lib/bcrypt";
import {setSessionUpdate} from "@utils/data-access";
/**
 * @swagger
 * /user/modify:
 *   post:
 *     tags:
 *       - user
 *     summary: 마이페이지 수정
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
 *                   userPwd:
 *                     type: string
 *                     description: 비밀번호
 *     responses:
 *       200:
 *         description: 마이페이지 수정
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const {params} = await req.json();
    const data = params?.data || params;
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    if (data) {
      const {
        userId,
        compCd,
        deptName,
        userName,
        userPwd,
        authCd,
        agrYn,
        modId,
      } = data;

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
