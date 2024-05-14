import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import './style.less';
import { postUploadImage } from '@/services/admin/upload';
import parse from 'html-react-parser';
import { renderToString } from 'react-dom/server';

type InsertFnType = (url: string, alt: string, href: string) => void;

function RichTextEditor({
  value,
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['group-video'],
  }; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: InsertFnType) {
          // TS 语法
          const { data } = await postUploadImage({ file });
          insertFn(data.url, '', data.url);
        },
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (!editor) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHtml()) {
      editor.setHtml(value || '');
    }
  }, [value]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          onCreated={(editor) => {
            setEditor(editor);
            try {
              editor.setHtml(value || '');
            } catch (e) {
              console.log(e);
            }
          }}
          onChange={(editor) => onChange?.(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
          className="rich-html"
        />
      </div>
    </>
  );
}

export default RichTextEditor;
