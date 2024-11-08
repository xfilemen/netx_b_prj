import prisma from "/lib/prisma";
import { getObjTrimAndNullProc } from "/utils/common-util";
import { getSession } from "/utils/data-access";
/**
 * @swagger
 * /req/regist:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 등록
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reqTitle:
 *                 type: string
 *                 description: 요청명
 *               reqName:
 *                 type: string
 *                 description: 요청명
 *               reqOrd:
 *                 type: string
 *                 description: 우선순위
 *               reqStatus:
 *                 type: string
 *                 description: 진행상황
 *               reqIntExtType:
 *                 type: string
 *                 description: 대내/외 구분
 *               reqHeadcount:
 *                 type: integer
 *                 description: 인원
 *               reqPurp:
 *                 type: integer
 *                 description: 목적
 *               reqDet:
 *                 type: array
 *                 description: 요청 상세
 *                 items:
 *                   type: object
 *                   properties:
 *                     reqJob:
 *                       type: string
 *                       description: 직무 구분
 *                     reqJobDet:
 *                       type: string
 *                       description: 직무 구분 2차
 *                     reqGrade:
 *                       type: string
 *                       description: 등급
 *                     reqInDt:
 *                       type: string
 *                       format: date
 *                       description: 투입 예정일
 *                     reqOutDt:
 *                       type: string
 *                       format: date
 *                       description: 투입 종료일
 *                     reqMm:
 *                       type: integer
 *                       description: 투입 공수
 *                     reqLoc:
 *                       type: string
 *                       description: 근무지
 *                     reqSkill:
 *                       type: string
 *                       description: 필수 요구기술
 *                     reqPrefSkill:
 *                       type: string
 *                       description: 우대 요구기술
 *                     reqType:
 *                       type: string
 *                       description: 유형
 *     responses:
 *       200:
 *         description: 요청 등록
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const { params } = await req.json();
    const data = params?.data || params;
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    const { user } = await getSession();

    if (data) {
      const procData = getObjTrimAndNullProc(data);
      const {
        reqTitle,
        reqName,
        reqOrd,
        reqStatus,
        reqIntExtType,
        reqType,
        reqPurp,
        reqDet,
        reqHeadcount,
      } = procData;

      const tbReqMgt = await prisma.tbReqMgt.create({
        data: {
          reqTitle,
          reqName,
          reqOrd,
          reqStatus,
          reqIntExtType: reqIntExtType || reqType,
          reqPurp,
          reqHeadcount,
          regId: user.userId,
          regDt: nowData,
        },
      });

      // 상세
      for (let i in reqDet) {
        const procData = getObjTrimAndNullProc(reqDet[i]);
        let {
          reqType,
          reqHeadcount,
          reqJob,
          reqJobDet,
          reqGrade,
          reqInDt,
          reqOutDt,
          reqMm,
          reqLoc,
          reqSkill,
          reqPrefSkill,
        } = procData;

        let createdTbReqMgtDet = await prisma.tbReqMgtDet.create({
          data: {
            reqId: tbReqMgt.reqId,
            reqType,
            reqHeadcount,
            reqJob,
            reqJobDet,
            reqGrade,
            reqInDt,
            reqOutDt,
            reqMm,
            reqLoc,
            reqSkill,
            reqPrefSkill,
            regId: user.userId,
            regDt: nowData,
          },
        });
        reqDet[i].reqDetId = createdTbReqMgtDet.reqDetId;
      }

      // 이력
      const tbReqMgtLog = await prisma.tbReqMgtLog.create({
        data: {
          reqId: tbReqMgt.reqId,
          reqLogDesc: "인력 요청",
          reqLogType: 1,
          regId: user.userId,
          regDt: nowData,
        },
      });

      tbReqMgt.reqDet = reqDet;

      return new Response(
        JSON.stringify({
          message: "정상적으로 처리되었습니다.",
          data: tbReqMgt,
        }),
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
