import prisma from '/lib/prisma';
import {getSession} from '/utils/data-access';
/**
 * @swagger
 * /req/list:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 내역 조회
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *     responses:
 *       200:
 *         description: 요청 내역 조회. 요청자일때는 본인 요청 내역만 가져오고 승인자일 경우 전체 내역 가져옴
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const { params } = await req.json();
    const data = params?.data || params;
    const {user} = await getSession();

    let whereReq = {}       // 요청 마스터 조회 조건
    let whereReqDet = {}    // 요청 상세 조회 조건

    //요청자일 때는 본인 요청내역만 조회
    if(user.authCd == 'request'){
      whereReq = { 
          regId : user.userId,

      }
    }

    whereReq = {
      ...whereReq,
      ...(data.reqStatus !== undefined ? { reqStatus: { in: data.reqStatus } } : {}), //요청현황
    }

    whereReqDet = {
      ...(data.reqType !== undefined ? { reqType: { in: data.reqType } } : {}),  //요청유형
      ...(data.reqInDt !== undefined ? { reqInDt: { gte: data.reqInDt  } } : {}),  //투입 시작일
      ...(data.reqOutDt !== undefined ? { reqOutDt: { lte: data.reqOutDt  } } : {}),  //투입 종료일
    }

    if( data.confName || data.regName ){
      const getUser = await prisma.tbUser.findMany({
        where: {
          userName: data.confName || data.regName ,
        },
        select: {
          userId: true,
        }
      })
      console.log('data.confName', data.confName)
      console.log('data.regName', data.regName)
      if(getUser.length > 0) {
        const ids = getUser.map(user => user.userId);

        whereReq = {
          ...whereReq,
          ...(data.confName !== undefined ? { confId: { in: ids } } : {}),
          ...(data.regName !== undefined ? { regId: { in: ids } } : {}),
        }
      }else{
        whereReq = {
          ...whereReq,
          ...(data.confName !== undefined ? { confId: data.confName } : {}),
          ...(data.regName !== undefined ? { regId: data.regName } : {}),
        }
      }
    }

    whereReq = {
      ...whereReq,
      reqDet: {
        some: whereReqDet
      }
    }

    const tbReqMgt = await prisma.tbReqMgt.findMany({
      where: whereReq,
      include: {
        reqDet: true,
        reqDet: {
          where: whereReqDet
        }
      },
      orderBy: {
        regDt: 'desc',
      },
    })

    return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbReqMgt}), {
      status: 200,
    })
  } catch(err){
    console.log(err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}