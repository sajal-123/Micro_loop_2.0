import React from 'react'
import Image from 'next/image'
import { deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import DocumentOptions from './DocumentOptions';
import { db } from '@/config/firebaseConfig';
interface Params {
    WorkSpaceId?: string;
    DocumentId?: string
    // Adjust the type according to your actual data structure
}

interface SideNavProps {
    params: Params;
    documentList: DocumentData
}

const DocumentList: React.FC<SideNavProps> = ({ documentList, params }) => {
    const deletedDocument = async (docId: string) => {
        console.log(docId)
        await deleteDoc(doc(db, 'workSpaceDocument', docId));
    }
    const router = useRouter();
    return (
        <div>
            {documentList.length > 0 && documentList.map((document: any, index: number) => (
                <div
                    onClick={() => router.push(`/workSpace/${params?.WorkSpaceId}/${document?.id}`)}
                    key={index}
                    className={`flex justify-between items-center mb-2 mt-3 hover:bg-gray-200 rounded-md p-2 cursor-pointer duration-200 ${params?.DocumentId == document.id ? ' bg-white' : ''}`}>
                    <div className='flex gap-2 items-center'>
                        {
                            !document?.emoji && <Image src={'/loopdocument.svg'} alt='document' width={24} height={24} />
                        }
                        <h2>{(document as any).emoji}   {(document as any).documentName}</h2>
                    </div>
                    <DocumentOptions document={document} deletedDocument={(docId) => deletedDocument(docId)} />
                </div>
            ))}

        </div>
    )
}

export default DocumentList
