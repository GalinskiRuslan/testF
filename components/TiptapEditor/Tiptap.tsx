'use client'

import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
import { ToolBar } from './ToolBar'

export default function Tiptap({ description, onChange }: { description: string, onChange: (value: string) => void }) {
    const editor = useEditor({
        extensions: [
            // StarterKit.configure(),
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "ronded-md border min-h-[150px] border-input bg-back"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        }
    })

    return (<div>
        <ToolBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
    )
}