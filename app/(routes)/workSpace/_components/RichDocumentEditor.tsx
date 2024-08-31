import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for SSR handling
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Alert from 'editorjs-alert';
import Delimiter from '@editorjs/delimiter';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import SimpleImage from 'simple-image-editorjs';
import CodeTool from '@editorjs/code';
import { useUser } from '@clerk/nextjs';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import GenerateAiTemplate from './GenerateAiTemplate';

function RichDocumentEditor(params: Params) {

  const ref = useRef<EditorJS | null>(null);
  const [DocumentOutput, setDocumentOutput] = useState([]);
  const { user } = useUser();
  let isFetched = false;

  useEffect(() => {
    if (user && !ref.current) {
      InitialEditor();
    }

    return () => {
      // Cleanup on unmount
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
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
        const output = doc.data()?.output;

        if (output) {
          try {
            const data = JSON.parse(output);

            if (!isFetched || doc.data()?.editedBy === user?.primaryEmailAddress?.emailAddress) {
              if (data && ref.current) {
                ref.current.render(data);
              }
            }

            isFetched = true;
          } catch (error) {
            console.error("Failed to parse JSON:", error);
          }
        } else {
          console.warn("Output is empty or undefined");
        }
      } else {
        console.warn("Document does not exist");
      }
    }, (error) => {
      console.error("Error getting document:", error);
    });

    return unsubscribe; // Ensure to clean up the listener when the component unmounts
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
        delimiter: Delimiter,
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
      <div className="fixed bottom-10 md:ml-80 left-0 z-10">
        <GenerateAiTemplate setGenerateAIOutput={(output) => {
          if (ref.current) {
            ref.current.render(output);
          }
        }} />
      </div>
    </div>
  );
}

// Exporting the component with SSR disabled
export default dynamic(() => Promise.resolve(RichDocumentEditor), {
  ssr: false
});
