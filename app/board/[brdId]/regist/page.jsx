"use client";

export default function PostRegist({params}) { 
  const { brdId } = params;

  return (
    <div> 
      <div> 게시물 작성화면</div> 
      <div> 게시판 ID : {brdId} </div> 
    </div>
  );
}

