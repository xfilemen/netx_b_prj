'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import React, { useState } from 'react';

import 'ckeditor5/ckeditor5.css';

function CustomEditor({ content,onDataChange  }) {
    
   // const [content, setContent] = useState('');


    const handleChange = (event, editor) => {
        const data = editor.getData();
        onDataChange(data); // 부모로 데이터 전송
    };


    return (
        <CKEditor
            editor={ ClassicEditor }
            data={content}
            onChange={handleChange}
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                mention: { 
                    // Mention configuration
                },
                initialData: '<p>Hello from CKEditor 5 in React!</p>'
            } }
        />
    );
}

export default CustomEditor;
