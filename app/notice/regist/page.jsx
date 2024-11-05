"use client";
import React, { useState,useEffect,useRef } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@styles/notice.module.css';
import Image from 'next/image';

import dynamic from 'next/dynamic';

const CustomEditor = dynamic( () => import( '../../components/ckeditor' ), { ssr: false } );

const NoticeCreatePage = () => {  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const { data: session } = useSession(); 



    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(setContent);

    };


    const triggerFileSelect = () => {
        document.getElementById('fileInput').click();
    };
    
    const handleChildDataChange = (data) => {
        console.log(data);
        setContent(data);
    };

    
    useEffect(function() {
        
    }, []);

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
                            <div className={styles.ckeditor}>
                            <CustomEditor onDataChange={handleChildDataChange} content={content} />
                            </div>
                        </div>
                        <div className={styles.file_submit}>
                            <label className={styles.file_label}>
                                <Image 
                                    src="/images/ico/ico_file_blt.png"
                                    alt="파일첨부 blt"
                                    width={8}
                                    height={14}
                                    className={styles.file_blt_img}
                                />
                                파일 첨부
                            </label>
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
                            <a href={'/notice'} className={styles.cancel_btn}>목록</a>
                            <button type="submit" className={styles.regisit_btn}>등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NoticeCreatePage;
