import prisma from '/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';


async function getComCode(param){
  
  return null;
}

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

async function getSession(req){
  const session = await getServerSession(authOptions);
  return session;
}
  
export {getComCode,getBoardInfo,getSession};