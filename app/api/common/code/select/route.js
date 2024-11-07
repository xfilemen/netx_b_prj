import prisma from '/lib/prisma';
/**
 * @swagger
 * /common/code/select:
 *   post:
 *     tags:
 *       - common
 *     summary: 공통코드 조회
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               params:
 *                 type: object
 *                 properties:
 *                   codeGrp:
 *                     type: string
 *                     description: 그룹 코드
 *     responses:
 *       200:
 *         description: 요청 내역 조회. 요청자일때는 본인 요청 내역만 가져오고 승인자일 경우 전체 내역 가져옴
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {

    const {params} = await req.json();
    const data = params?.data || params;

    if(data){
      let where = {}
      if(data.codeGrp){
        where = {
          codeGrp: data.codeGrp
        }
      }


      const tbComCode = await prisma.tbComCode.findMany({
        where
      })
      return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbComCode}), {
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