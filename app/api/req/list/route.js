import prisma from '/lib/prisma';
export async function POST(req) {
  try {
    const tbReqMgt = await prisma.tbReqMgt.findMany({
      include: {
        reqDet: true,
      }
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