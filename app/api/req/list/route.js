import prisma from '/lib/prisma';
import {getSession} from '/utils/data-access';
/**
 * @swagger
 * /req/list:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 내역 조회
 *     parameters:
 *       - in: 
 *         name: 
 *         required: 
 *         schema:
 *           type: 
 *         description: 
 *     responses:
 *       200:
 *         description: 요청 내역 조회. 요청자일때는 본인 요청 내역만 가져오고 승인자일 경우 전체 내역 가져옴
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const {user} = await getSession();

    let where = {}
    //요청자일 때는 본인 요청내역만 조회
    if(user.authCd == 'request'){
      where = { 
          regId : user.userId
      }
    }

    const tbReqMgt = await prisma.tbReqMgt.findMany({
      where,
      include: {
        reqDet: true,
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