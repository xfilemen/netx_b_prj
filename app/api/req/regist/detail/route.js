import prisma from '/lib/prisma';
export async function POST(req) {
  try {

    const data = await req.json();
    if(data.params){
      console.log('📢 [route.js:7]', data.params);
      const {reqId,reqType,reqGrade,reqInDt,reqOutDt,reqMm,reqLoc,reqSkill,reqJob,reqJobDet,regDetId} = data.params;

      const post = await prisma.tbReqMgtDet.create({
        data: {
            reqId,reqType,reqGrade,reqInDt,reqOutDt,reqMm,reqLoc,reqSkill,reqJob,reqJobDet,regDetId
        },
      });

      console.log(data);
      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : post}), {
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