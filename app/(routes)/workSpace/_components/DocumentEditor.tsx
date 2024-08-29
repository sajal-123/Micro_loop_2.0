import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import CommentBox from './CommentBox';

interface Params {
    [key: string]: any; // Replace 'any' with specific types if known
}
const DocumentEditor = (params: Params) => {
    const [OpenCommentBox, setOpenCommentBox] = useState(false)
    return (
        <div className='md:w-[80vw]'>
            {/* Header */}
            <DocumentHeader />

            {/* DocuemntInfo */}
            <DocumentInfo params={params} />
            {/* Rich Text Editor */}

            <div className='grid grid-cols-4'>
                <div className='col-span-3'>
                    <RichDocumentEditor params={params} />

                </div>

                <div className='fixed right-5 bottom-5'>
                    <Button onClick={() => setOpenCommentBox(!OpenCommentBox)}>
                        {OpenCommentBox ? <X /> : <MessageCircle />}
                    </Button>
                    {OpenCommentBox && <CommentBox />}
                </div>
            </div>
        </div>
    )
}

export { DocumentEditor }
