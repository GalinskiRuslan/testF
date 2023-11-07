"use client"
import React from 'react'
import { type Editor } from "@tiptap/react"
import { List, Bold, ListOrdered, Heading, Italic } from "lucide-react"

type Props = {
    editor: Editor | null
}
export function ToolBar({ editor }: Props) {
    if (!editor) {
        return null
    }
    return (
        <div>ToolBar</div>
    )
}
