import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Alert from 'editorjs-alert'
import Delimeter from '@editorjs/delimiter'
function RichDocumentEditor() {

  const ref = useRef();
  const editor = useRef<EditorJS | null>(null);

  useEffect(() => {
    InitialEditor()
  }, [])

  // Used to save Document
  const saveDocument = () => {
    ref.current?.save().then((outputData:any) => {
      console.log("save changes")
      console.log(outputData)
    })
  }
  const InitialEditor = () => {
    if (!editor.current) {
      const editor = new EditorJS({
        onChange: (ap, event) => {
          saveDocument()
        },
        holder: 'editorjs',
        tools: {
          header: Header,
          delimiter: Delimeter,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
              alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
              defaultType: 'primary',
              messagePlaceholder: 'Enter something',
            },
          },
        }
      })
      ref.current = editor
    }
  }
  return (
    <div className='lg:-ml-10 '>
      <div id="editorjs" className=' bg-red-200'>

      </div>
    </div>
  )
}

export default RichDocumentEditor
