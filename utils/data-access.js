import prisma from '/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { userAgent } from 'next/server';


async function getComCode(param){
  
  return null;
}

/*
* 게시판 정보 조회
*/
async function getBoardInfo(param){
  try {
      const tbBoard = await prisma.tbBoard.findMany({
          where: {
              brdId: param,
              useYn : 'Y'
          }
      })

      return tbBoard;

    } catch(err){
      console.log(err);
      return null;

    } finally {
      await prisma.$disconnect();

    }
}

/*
* user 세션 정보 조회
*/
async function getSession(req){
  const session = await getServerSession(authOptions);
  return session;
}

/*
* 권한 체크
*/
async function getAuthCheck(authCd){
  const session = await getServerSession(authOptions);
  if(session.user){
    return ( session.user.authCd == authCd );
  }
  return false;
}
  
export {getComCode,getBoardInfo,getSession,getAuthCheck};