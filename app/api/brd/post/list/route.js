import prisma from '/lib/prisma';
/**
 * @swagger
 * /brd/post/list:
 *   post:
 *     tags:
 *       - board
 *     summary: 게시물 목록 조회
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
 *                   page:
 *                     type: integer
 *                     description: 시작 게시물 번호
 *                   pageSize:
 *                     type: integer
 *                     description: 게시물 조회 갯수
 *                   brdId:
 *                     type: integer
 *                     description: 게시판 번호
 *     responses:
 *       200:
 *         description: 게시물 목록 조회
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    

    const {params} = await req.json();
    const data = params?.data || params;

    if(data){
      const {page,pageSize,brdId} = data;
      const skip = (page - 1) * pageSize; // 가져올 게시물 시작 번호
      const take = pageSize;  // 가져올 항목 수
    
      const tbPost = await prisma.tbPost.findMany({
        skip: skip,   // 가져올 게시물 시작 번호
        take: take,   // 가져올 항목 수
        where : {
          brdId
        },
        orderBy: {
          createdAt: 'desc', 
        },
        include: {
          tbUserReg: {
            select : {
              userName : true
            }
          },
          tbUserMod: {
            select : {
              userName : true
            }
          },
        }
      })
      console.log(tbPost);
      return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : tbPost}), {
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