import prisma from '/lib/prisma';
import { getSession } from "/utils/data-access";
/**
 * @swagger
 * /brd/post/modify:
 *   post:
 *     tags:
 *       - board
 *     summary: 게시판 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brdId:
 *                 type: integer
 *                 description: 게시판 id
 *               pstTitle:
 *                 type: string
 *                 description: 제목
 *               pstContents:
 *                 type: string
 *                 description: 내용
 *               modId:
 *                 type: string
 *                 description: 작성자 id
 *               viewYn:
 *                 type: string
 *                 description: 노출 여부
 *     responses:
 *       200:
 *         description: 게시판 수정
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {

    const data = await req.json();
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    const { user } = await getSession();
    if(data.params){

      const { pstId, brdId, pstTitle, pstContents, viewYn, modId } = data.params;

      const updatedTbPost = await prisma.tbPost.update({
        where: { pstId_brdId: { pstId: parseInt(pstId), brdId } },
        data: {
          pstTitle,
          pstContents,
          viewYn,
          modId: user.userId,
          modDt: nowData
        },
      });


      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : updatedTbPost}), {
        status: 200,
      })

    }else{
      throw new Error('param null');
    }
    // const { cj_id, password } = data;
    // console.log(cj_id, password );
    
  } catch(err){
    console.log('📢 [route.js:28]11', err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: err,
    })
  } finally {
    await prisma.$disconnect();
  }

}