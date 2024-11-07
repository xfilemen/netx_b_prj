import prisma from '/lib/prisma';
/**
 * @swagger
 * /req/log/list:
 *   post:
 *     tags:
 *       - request
 *     summary: 요청 진행 현황 조회
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
 *     responses:
 *       200:
 *         description: 선택한 요청 내역의 진행 현황 목록이 조회된다.
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const {params} = await req.json();
    const data = params?.data || params;

    if(params){
      let tbReqMgtLog = await prisma.tbReqMgtLog.findMany({
        where: { 
            reqId : data.reqId
        },
        include: {
          tbUserReg: {
            select : {
              userName : true
            }
          }
        },
        orderBy: {
          regDt: 'desc',
        },
      })

      //권한 조회
      const getAuth = await prisma.tbAuthUser.findMany({
        where: {
            userId: tbReqMgtLog.userId,
        },
        include: {
            auth: {
            where: {
                authType: 'role',
            },
            }
        }
      })
      
      for(const i in tbReqMgtLog){
        tbReqMgtLog[i].userName = tbReqMgtLog[i].tbUserReg.userName;
        tbReqMgtLog[i].authCd = getAuth[0].authCd;
        tbReqMgtLog[i].authName = getAuth[0]?.auth?.authName;
      }


      return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbReqMgtLog}), {
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