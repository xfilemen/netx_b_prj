import prisma from '/lib/prisma';

/**
 * 인력 요청 화면 시퀀스 조회를 위한 route
 * @param {*} req 
 * @returns 
 */
export async function POST(req) {
  try {
    // 시퀀스 값을 수동으로 설정하는 Raw SQL 쿼리
    const result = await prisma.$queryRaw`SELECT nextval('tb_board_brd_id_seq')`;
    console.log('📢 [route.js:6]', result);
    const nextValue = result[0].nextval.toString(); // BigInt 값을 문자열로 변환

    return new Response(JSON.stringify({ message: '정상적으로 조회되었습니다.', data : nextValue}), {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: '오류 발생' }), {
      status: 401,
    })
  } finally {
    await prisma.$disconnect();
  }

}