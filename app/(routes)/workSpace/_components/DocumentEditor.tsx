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
    const [OpenCommentBox,setOpenCommentBox]=useState(false)
    return (
        <div className='md:w-[80vw]'>
            {/* Header */}
            <DocumentHeader />

            {/* DocuemntInfo */}
            <DocumentInfo params={params} />
            {/* Rich Text Editor */}
            <RichDocumentEditor params={params} />


            <div className='fixed right-5 bottom-5 z-50'>
                <Button onClick={()=>setOpenCommentBox(!OpenCommentBox)}>
                    {OpenCommentBox? <X/>:<MessageCircle />}
                </Button>
                    {OpenCommentBox &&  <CommentBox/>}
            </div>
        </div>
    )
}

export { DocumentEditor }
