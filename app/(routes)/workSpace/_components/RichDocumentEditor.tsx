// import React, { useEffect, useRef, useState } from 'react'
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header'
// import Alert from 'editorjs-alert'
// import Delimeter from '@editorjs/delimiter'
// import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
// import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
// import { db } from '@/config/firebaseConfig';
// import List from "@editorjs/list";
// import NestedList from '@editorjs/nested-list';
// import Checklist from '@editorjs/checklist'
// import Embed from '@editorjs/embed';
// import Table from '@editorjs/table'
// import SimpleImage from 'simple-image-editorjs';
// import CodeTool from '@editorjs/code'
// import { useUser } from '@clerk/nextjs';

// function RichDocumentEditor(params: Params) {

//   const ref = useRef();
//   let editor: any;
//   const [DocumentOutput, setDocumentOutput] = useState([])
//   const { user } = useUser();

//   useEffect(() => {
//     user && InitialEditor();
//   }, []);

//   // Used to save Document
//   const saveDocument = async () => {
//     console.log("UPDATE")
//     try {
//       ref.current?.save().then(async (outputData: any) => {
//         const docRef = doc(db, 'documentId', params.params.params.DocumentId);
//         await updateDoc(docRef, {
//           output: JSON.stringify(outputData),
//           editedBy: user?.primaryEmailAddress?.emailAddress
//         });
//       });
//       console.log("Docuemnt Updated", params.params.params.DocumentId)
//     } catch (error) {
//       console.error("Error saving document:", error);
//     }
//   };

//   const GetDocumentOutput = () => {
//     const unsubscribe = onSnapshot(doc(db, 'documentId', params.params.params.DocumentId), (doc) => {
//       console.log(doc.data())
//       doc.data()?.output && editor.current?.render(doc.data()?.output);
//     });

//     return unsubscribe;
//   };

//   const InitialEditor = () => {
//     if (!editor.current) {
//       editor = new EditorJS({
//         onChange: (ap, event) => {
//           saveDocument();
//         },
//         onReady: () => {
//           GetDocumentOutput()
//         },
//         holder: 'editorjs',
//         tools: {
//           header: Header,
//           delimiter: Delimeter,
//           alert: {
//             class: Alert,
//             inlineToolbar: true,
//             shortcut: 'CMD+SHIFT+A',
//             config: {
//               alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
//               defaultType: 'primary',
//               messagePlaceholder: 'Enter something',
//             },
//           },
//           list: {
//             class: List,
//             inlineToolbar: true,
//             shortcut: 'CMD+SHIFT+L',
//             config: {
//               defaultStyle: 'unordered',
//             },
//           },
//           table: Table,
//           checklist: {
//             class: Checklist,
//             shortcut: 'CMD+SHIFT+C',
//             inlineToolbar: true,
//           },
//           image: SimpleImage,
//           code: {
//             class: CodeTool,
//             shortcut: 'CMD+SHIFT+P',
//           },
//         },
//       });
//       ref.current = editor;
//     }
//   };

//   return (
//     <div className='lg:-ml-10'>
//       <div id="editorjs" className='' />
//     </div>
//   );
// }

// export default RichDocumentEditor;
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Alert from 'editorjs-alert'
import Delimeter from '@editorjs/delimiter'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { db } from '@/config/firebaseConfig';
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed';
import Table from '@editorjs/table'
import SimpleImage from 'simple-image-editorjs';
import CodeTool from '@editorjs/code'
import { useUser } from '@clerk/nextjs';

function RichDocumentEditor(params: Params) {

  const ref = useRef<EditorJS | null>(null);
  const [DocumentOutput, setDocumentOutput] = useState([]);
  const { user } = useUser();
  let isFetched = false;

  useEffect(() => {
    if (user && !ref.current) {
      InitialEditor();
    }
    // Cleanup on unmount
  }, [user]);

  const saveDocument = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const docRef = doc(db, 'documentId', params.params.params.DocumentId);
        await updateDoc(docRef, {
          output: JSON.stringify(outputData),
          editedBy: user?.primaryEmailAddress?.emailAddress
        });
      } catch (error) {
        console.error("Error saving document:", error);
      }
    }
  };

  const GetDocumentOutput = () => {
    const docRef = doc(db, 'documentId', params.params.params.DocumentId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data()?.output;
        if (isFetched == false || doc.data()?.editedBy == user?.primaryEmailAddress?.emailAddress)
          if (data && ref.current) {
            ref.current.render(JSON.parse(data));
          }
        isFetched = true;
      }
    }, (error) => {
      console.error("Error getting document:", error);
    });

    return unsubscribe;
  };

  const InitialEditor = () => {
    ref.current = new EditorJS({
      onChange: () => {
        saveDocument();
      },
      onReady: () => {
        GetDocumentOutput();
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
        list: {
          class: List,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
          config: {
            defaultStyle: 'unordered',
          },
        },
        table: Table,
        checklist: {
          class: Checklist,
          shortcut: 'CMD+SHIFT+C',
          inlineToolbar: true,
        },
        image: SimpleImage,
        code: {
          class: CodeTool,
          shortcut: 'CMD+SHIFT+P',
        },
      },
    });
  };

  return (
    <div className='lg:-ml-10 mr-20'>
      <div id="editorjs" className='' />
    </div>
  );
}

export default RichDocumentEditor;
