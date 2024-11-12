import prisma from "/lib/prisma";
export async function POST(req) {
  try {
    const data = await req.json();
    if (data.params) {
      const { pstId, brdId } = data.params;

      const tbPost = await prisma.tbPost.findUnique({
        where: {
          pstId_brdId: { pstId: parseInt(pstId), brdId: 3 },
        },
      });

      return new Response(
        JSON.stringify({ message: "정상적으로 처리되었습니다.", data: tbPost }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("param null");
    }
  } catch (err) {
    console.log("📢 [route.js:28]11", err);
    return new Response(JSON.stringify({ message: "오류 발생" }), {
      status: err,
    });
  } finally {
    await prisma.$disconnect();
  }
}
