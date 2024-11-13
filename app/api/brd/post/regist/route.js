import prisma from "/lib/prisma";
export async function POST(req) {
  try {
    const data = await req.json();
    const currentTime =
      await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowData = new Date(currentTime[0].timezone);
    if (data.params) {

      const { brdId, pstTitle, pstContents, viewYn, regId, regDt } = data.params;
      const post = await prisma.tbPost.create({
        data: {
          brdId,
          pstTitle,
          pstContents,
          viewYn,
          regId,
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
