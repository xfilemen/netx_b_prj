"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from '/app/styles/notice.module.css';
import '/app/styles/ckeditorStyles.css'; 
import Image from 'next/image';

const NoticeCreatePage = () => {  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const { data: session } = useSession(); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const date = new Date(); // 현재 날짜
    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('content', content);
    //     formData.append('date', date.toISOString());
    //     formData.append('author', session?.user?.name || '익명');

    //     if (file) {
    //         formData.append('file', file);
    //     } else {
    //         alert('첨부파일을 선택해 주세요.');
    //         return;
    //     }

    //     try {
    //         const res = await fetch('/api/notices', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (res.ok) {
    //             alert('공지사항이 등록되었습니다.');
    //             // 폼 초기화
    //             setTitle('');
    //             setContent('');
    //             setFile(null);
    //         } else {
    //             alert(`등록에 실패했습니다: ${res.statusText}`);
    //         }
    //     } catch (error) {
    //         console.error('등록 중 에러:', error);
    //     }
    // };

    const triggerFileSelect = () => {
        document.getElementById('fileInput').click();
    };

    if (!session) {
        alert('로그인 후 이용해 주세요.');
        return null; // 세션이 없을 경우 페이지 렌더링 중지
    }

    return (
        <div className={styles.content}>
            <div className={styles.topbanner}>
                <Image 
                    src="/images/detail/TopVisual.png"
                    alt="효율적인 인력배치 언제든 문의하세요"
                    width={1440}
                    height={150}
                />
            </div>
            <div className={styles.wrap}>
                <h2>공지사항 등록</h2>
                <div className={styles.noti_regist}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.header}>
                            <label>제목</label>
                            <input
                                type="text"
                                value={title}
                                placeholder='제목을 입력해 주세요. (최대 40자)'
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.content}>
                            <label>내용</label>
                            <div className={styles.ckeditor}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={content}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.file_submit}>
                            <label>파일 첨부</label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{display:'none'}}
                                onChange={handleFileChange}
                            />
                            <span className={styles.file_tx}>{file ? `${file.name}` : '첨부파일이 없습니다.'}</span>
                            <button type="button" onClick={triggerFileSelect} className={styles.submit_btn}>첨부 파일</button>                        
                        </div>
                        <div className={styles.regi_btn}>
                            <a href={'/notice'} className={styles.cancel_btn}>취소</a>
                            <button type="submit" className={styles.regisit_btn}>등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoticeCreatePage;