import clsx from 'clsx';
import s from './EditorContent.module.css';
import { useEditor, EditorContent } from '@tiptap/react';
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Italic from '@tiptap/extension-italic';
import { InputLinkModal } from '../InputLinkModal/InputLinkModal';
import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const MyEditor = ({ value, onChange }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        italic: false,
      }),
      Italic,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder: 'Enter a text...',
        emptyEditorClass: s.empty,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
  }, [editor]);

  const openLinkModal = () => {
    if (editorRef.current && editorRef.current.state.selection.empty) {
      toast.error('Please select the text you want to link.');
      return;
    }
    setModalOpen(true);
  };
  const closeLinkModal = () => setModalOpen(false);

  const handleAddLink = (url) => {
    if (!url) return;

    const editor = editorRef.current;
    if (!editor) {
      toast.error('Editor is not ready');
      return;
    }
    if (!editor.state.selection || editor.state.selection.empty) {
      toast.error('Please select the text you want to link.');
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url, target: '_blank', rel: 'noopener noreferrer' })
      .run();
    closeLinkModal();
  };

  if (!editor) return null;

  return (
    <div className={s.editor}>
      <div className={s.toolbar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('bold'),
          })}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('italic'),
          })}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('strike'),
          })}
        >
          S
        </button>
        <span className={s.toolbarSeparator}></span>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('heading', { level: 1 }),
          })}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('heading', { level: 2 }),
          })}
        >
          H2
        </button>
        <span className={s.toolbarSeparator}></span>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive({ textAlign: 'left' }),
          })}
          title="Align Left"
        >
          <AiOutlineAlignLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive({ textAlign: 'center' }),
          })}
          title="Align Center"
        >
          <AiOutlineAlignCenter size={20} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive({ textAlign: 'right' }),
          })}
          title="Align Right"
        >
          <AiOutlineAlignRight size={20} />
        </button>
        <span className={s.toolbarSeparator}></span>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('bulletList'),
          })}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('orderedList'),
          })}
        >
          1. List
        </button>
        <span className={s.toolbarSeparator}></span>

        <button
          type="button"
          onClick={openLinkModal}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.isActive('link'),
          })}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: !editor.isActive('link'),
          })}
        >
          Unlink
        </button>
        <span className={s.toolbarSeparator}></span>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.can().undo(),
          })}
        >
          ↶ Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={clsx(s.toolbarButton, {
            [s.active]: editor.can().redo(),
          })}
        >
          ↷ Redo
        </button>
      </div>

      <EditorContent editor={editor} className={s['editor-content']} />
      <InputLinkModal isOpen={isModalOpen} onClose={closeLinkModal} onSubmit={handleAddLink} />
    </div>
  );
};
