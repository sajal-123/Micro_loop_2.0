import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor';

interface Params {
    [key: string]: any; // Replace 'any' with specific types if known
}
const DocumentEditor = (params: Params) => {
    return (
        <div className='md:w-[80vw]'>
            {/* Header */}
            <DocumentHeader />

            {/* DocuemntInfo */}
            <DocumentInfo params={params} />
            {/* Rich Text Editor */}
            <RichDocumentEditor/>

        </div>
    )
}

export { DocumentEditor }
