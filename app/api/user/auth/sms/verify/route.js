import prisma from '/lib/prisma';

export async function POST(req) {
  try {
    const setTimeZone = await prisma.$queryRaw`SET TIME ZONE 'Asia/Seoul'`;
    const currentTime = await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul'`;
    const nowDate = new Date(currentTime[0].timezone);

    const data = await req.json();
    if(data.params.data){
      const { authSmsId, regId, authSmsCd } = data.params.data;
      let authSmsStatus = '000';

      const smsCode = await prisma.tbAuthSmsVerify.findMany({
        where : {authSmsId , regId}
      })

      if(smsCode.length == 0){
        authSmsStatus  = '004';

      }else if(authSmsCd !== smsCode[0].authSmsCd){
        authSmsStatus  = '003';
              
      }else {
        const date1 = new Date(nowDate);
        const date2 = new Date(smsCode[0].regDt);
        const diffss = date1 - date2;
        console.log('nowDate : ' , nowDate);
        console.log('smsCode.regDt : ' , smsCode[0].regDt);
        console.log('date1 : ' , date1);
        console.log('date2 : ' , date2);
        console.log('diffss : ' , diffss);
        // 3분 초과 여부 확인
        if(diffss > 3 * 60 * 1000){
          authSmsStatus  = '002';
        }else{
          authSmsStatus  = '001';
        }
      }

      const updateSmsVerify = await prisma.tbAuthSmsVerify.update({
        where: { authSmsId , regId },
        data: {
          authSmsStatus,
          modId : regId,
          modDt : nowDate,
        },
      });

      let msg = "";
      switch (authSmsStatus) {
        case '001':
          msg = "인증이 완료되었습니다"; break;
        case '002':
          msg = "인증 시간이 초과되었습니다"; break;
        case '003':
          msg = "인증코드가 일치하지 않습니다"; break;
        case '004':
          msg = "발송 내역을 확인할 수 없습니다"; break;
        default:
          msg = "인증에 실패했습니다"; 
      }

      return new Response(JSON.stringify({ 
                                            message: '정상적으로 처리되었습니다.', 
                                            data : { authSmsStatus:authSmsStatus,msg }
                                        }), 
      {
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

/*

  authSmsId      Int       @id @default(autoincrement()) @map("auth_sms_id")
  authSmsCd      String    @db.VarChar(10) @map("auth_sms_cd")
  authSmsStatus  String    @default("000") @db.VarChar(10) @map("auth_sms_status")
  regDt          DateTime  @default(now()) @map("reg_dt")
  regId          String?   @db.VarChar(20) @map("reg_id")
  modDt          DateTime? @map("mod_dt")
  modId          String?   @db.VarChar(20) @map("mod_id")
*/