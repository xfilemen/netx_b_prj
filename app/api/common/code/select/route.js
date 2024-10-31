import prisma from '/lib/prisma';
export async function POST(req) {
  try {

    const data = await req.json();
    if(data.params){
      const {codeGrp} = data.params;


      const tbComCode = await prisma.tbComCode.findMany({
        where: {
          codeGrp: codeGrp
        }
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