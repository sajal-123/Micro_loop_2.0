'use client';
import Logo from '@/app/_comoponents/Logo';// Corrected the import path
import { Bell, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { collection, query, where, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import uuid4 from "uuid4";
import Image from 'next/image';
import DocumentList from './DocumentList';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '@/components/ui/toast';


// Define a type for Params if you know the specific properties
interface Params {
    WorkSpaceId?: string; // Adjust the type according to your actual data structure
    DocumentId?: string
}

interface SideNavProps {
    params: Params;
}


const MAX_FILE: number = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT);
const SideNav: React.FC<SideNavProps> = ({ params }) => {
    const [documentList, setDocumentList] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast()
    const GetDocuments = () => {
        if (!params?.WorkSpaceId) {
            console.error("WorkSpaceId is missing");
            return;
        }

        const q = query(collection(db, 'workSpaceDocument'), where('WorkSpaceId', '==', params.WorkSpaceId));
        setDocumentList([]);
        const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
            const documents: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                console.log('Document Data:', doc.data());
                documents.push(doc.data());
            });
            setDocumentList(documents);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    };

    useEffect(() => {
        GetDocuments();
    }, [params]);

    // creating a new Document
    const createNewDocument = async () => {
        if (documentList?.length >= MAX_FILE) {
            toast({
                title: "Upgrade to add more files",
                description: "You have reached you maxLimit",
                action: (
                    <ToastAction className='bg-black text-slate-100' altText="Goto schedule to undo">Upgrade</ToastAction>
                  ),
              })
            return;
        }
        setLoading(true)
        const docId = uuid4();
        await setDoc(doc(db, 'workSpaceDocument', docId), {
            WorkSpaceId: params.WorkSpaceId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverUrl: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        });
        await setDoc(doc(db, 'documentId', docId), {
            docId: docId,
            output: []
        });
        setLoading(false);
        // router.replace(`/workSpace/${params.WorkSpaceId}/${docId}`);
    }

    return (
        <div className='md:w-[20vw] hidden md:block fixed p-5 shadow-md bg-blue-50 h-screen'>
            <div className='flex justify-between items-center'>
                <Logo />
                <Bell className='h-5 w-5 text-gray-500' />
            </div>
            <hr className='my-5' />
            <div className='flex justify-between items-center'>
                <h1 className='font-medium'>WorkSpace Name</h1>
                <Button size="sm" className="text-lg" onClick={createNewDocument}>
                    {loading ? <Loader2Icon className='h-4 w-4 animate-spin' /> : '+'}
                </Button>
            </div>
            <DocumentList params={params} documentList={documentList} />

            <div className='w-[85%] absolute bottom-10'>
                <Progress value={((documentList?.length * 100) / MAX_FILE)} className='h-1 bg-purple-200' />
                <h2 className='font-light text-sm my-2'> <strong>{documentList.length}</strong> out of <strong>5</strong> files used</h2>
                <h2 className='font-light text-sm my-2'>Upgrade You rplan for Ultimate access</h2>
            </div>
        </div>
    );
};

export default SideNav;
