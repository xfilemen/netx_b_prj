"use client";

export default function PostList({params}) { 
  const { brdId } = params;
  
  return (
    <div> 
      <div> 게시물 목록 화면</div> 
      <div> 게시판 ID : {brdId} </div> 
    </div>
  );
}

