"use client";

export default function PostModify({params}) { 
  const { brdId,pstId } = params;

  return (
    <div> 
      <div> 게시물 수정화면 </div>
      <div> 게시판 ID : {brdId} </div>
      <div> 게시물 ID : {pstId} </div>
    </div>
  );
}

