import { Editor, EditorState } from "draft-js";
import { FC, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const MyEditor = ({ value, setValue }: { value: string, setValue: any }) => {
    // // const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    // const handleChange = (state: EditorState) => {
    //     setEditorState(state)
    // }

    // return <Editor onChange={handleChange} editorState={editorState} />
    return <ReactQuill theme="snow" value={value} onChange={setValue} />
}

export default MyEditor;