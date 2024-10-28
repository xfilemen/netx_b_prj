import prisma from '/lib/prisma';
export async function POST(req) {
  try {

    const data = await req.json();
    if(data.params){
      console.log('📢 [route.js:7]', data.params);
      const {reqId,reqType,reqGrade,reqInDt,reqOutDt,reqMm,reqLoc,reqSkill,reqJob,reqJobDet} = data.params;

      const post = await prisma.tbReqMgtDet.create({
        data: {
            reqId,reqType,reqGrade,reqInDt,reqOutDt,reqMm,reqLoc,reqSkill,reqJob,reqJobDet
        },
      });

      console.log('📢 [route.js:16]', post);
      return new Response(JSON.stringify({ message: '정상적으로 처리되었습니다.', data : post}), {
        status: 200,
      })

    }else{
      throw new Error('param null');
    }
    // const { cj_id, password } = data;
    // console.log(cj_id, password );
    
  } catch(err){
    console.log('📢 [route.js:28]', err);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: err,
    })
  } finally {
    await prisma.$disconnect();
  }

}