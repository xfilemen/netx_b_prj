import prisma from "@lib/prisma";
import { getSession } from "@utils/data-access";
import { sanitizeContent } from '@lib/dompurify';
/**
 * @swagger
 * /brd/post/regist:
 *   post:
 *     tags:
 *       - board
 *     summary: 게시판 등록
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
 *                    brdId:
 *                      type: integer
 *                      description: 게시판 id
 *                    pstTitle:
 *                      type: string
 *                      description: 제목
 *                    pstContents:
 *                      type: string
 *                      description: 내용
 *                    regId:
 *                      type: string
 *                      description: 작성자 id
 *                    viewYn:
 *                      type: string
 *                      description: 노출 여부
 *     responses:
 *       200:
 *         description: 게시판 등록
 *       401:
 *         description: 오류 코드
 */
export async function POST(req) {
  try {
    const { params } = await req.json();
    const data = params?.data || params;
    console.log('상세진행 내역: req', data);
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    const { user } = await getSession();

    if (data) {

      const { brdId, pstTitle, pstContents, viewYn, regId, regDt } = data;

      const contentVerify = await sanitizeContent(pstContents);
      console.log(pstContents)
      console.log(contentVerify)

      const post = await prisma.tbPost.create({
        data: {
          brdId,
          pstTitle,
          pstContents: contentVerify,
          viewYn,
          regId: user.userId,
          regDt: nowData,
        },
      });

      console.log(data);
      return new Response(
        JSON.stringify({ message: "정상적으로 처리되었습니다.", data: post }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("param null");
    }
    // const { cj_id, password } = data;
    // console.log(cj_id, password );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "오류 발생" }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}
