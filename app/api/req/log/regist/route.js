import prisma from '/lib/prisma';
/**
 * @swagger
 * /req/log/regist:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 진행 현황 등록
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
 *                   reqId:
 *                     type: integer
 *                     description: 요청내역 id
 *                   reqLogDesc:
 *                     type: string
 *                     description: 요청 진행 현황 메시지
 *                   reqLogType:
 *                     type: integer
 *                     description: type 1 은 시스템 메시지, 2 는 사용자가 직접 입력한 메시지 
 *                   regId:
 *                     type: string
 *                     description: 메시지 작성자 id
 *     responses:
 *       200:
 *         description: 요청 내역의 진행 현황 메시지 등록
 *       401:
 *         description: 오류 코드
 */

export async function POST(req) {
  try {
    
    const {params} = await req.json();
    const data = params?.data || params;
    console.log('상세진행 내역: req', data);

    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);

    if(data){
      const { reqId, reqLogDesc, reqLogType, regId } = data;

      const tbReqMgtLog = await prisma.tbReqMgtLog.create({
        data: {
          reqId,
          reqLogDesc,
          reqLogType,
          regId,
          regDt : nowData
        },
      });

      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : tbReqMgtLog}), {
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