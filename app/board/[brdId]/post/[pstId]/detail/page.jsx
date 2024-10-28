"use client";

export default function PostDetail({params}) { 
  const { brdId,pstId } = params;

  return (
    <div> 
      <div> 게시물 상세화면 </div>
      <div> 게시판 ID : {brdId} </div>
      <div> 게시물 ID : {pstId} </div>
    </div>
  );
}

