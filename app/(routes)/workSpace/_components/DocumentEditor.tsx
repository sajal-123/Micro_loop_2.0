import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'

const DocumentEditor = () => {
    return (
        <div className='md:w-[80vw]'>
            {/* Header */}
            <DocumentHeader/>

            {/* DocuemntInfo */}
            <DocumentInfo/>
            {/* Rich Text Editor */}
            
        </div>
    )
}

export { DocumentEditor }
