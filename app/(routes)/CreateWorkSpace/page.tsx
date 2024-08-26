'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Loader2Icon, SmilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoverPicker from '@/app/_comoponents/CoverPicker';
import EmojiPickerComponent from '@/app/_comoponents/EmojiPicker';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useRouter } from 'next/navigation';
import uuid4 from 'uuid4';

function CreateWorkSpace() {
    const router = useRouter();
    const [workspacename, setWorkspacename] = useState('');
    const [coverImage, setCoverImage] = useState('/cover.webp');
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const { orgId } = useAuth() || {};
    const onCreateWorkSpace = async () => {
        const WorkSpaceId = Date.now().toString();
        setLoading(true);
        try {
            await setDoc(doc(db, 'WorkSpace', WorkSpaceId), {
                name: workspacename,
                emoji: emoji,
                coverUrl: coverImage,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                id: WorkSpaceId,
                orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
            });
            const docId = uuid4();
            await setDoc(doc(db, 'workSpaceDocument', docId), {
                WorkSpaceId: WorkSpaceId,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                coverUrl: null,
                emoji: null,
                id: docId,
                documentName:'Untitled Document',
                documentOutput: []
            });
            await setDoc(doc(db, 'documentId', docId), {
                docId: docId,
                output: []
            });
            setLoading(false);
            router.replace(`/workSpace/${WorkSpaceId}/${docId}`);
        } catch (error: any) {
            console.error("Error creating workspace: ", error?.message);
            setLoading(false);
        }
    };

    return (
        <div className='p-10 py-28 md:px-24 lg:px-64 xl:px-96 overflow-hidden'>
            <div className='shadow-2xl border-2 rounded-lg'>
                {/* Cover Image */}
                <CoverPicker setNewCover={(v: string) => setCoverImage(v)}>
                    <div className='relative group cursor-pointer'>
                        <h1 className='hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center text-white bg-black bg-opacity-50'>Change Image</h1>
                        <div>
                            <Image src={coverImage} alt='coverImage' width={400} height={400} className='w-full h-[150px] object-cover rounded-lg group-hover:opacity-50' />
                        </div>
                    </div>
                </CoverPicker>
                {/* Input Section */}
                <div className='p-12'>
                    <h1 className='font-medium text-xl'>
                        Create a new WorkSpace
                    </h1>
                    <h2 className='text-sm mt-2'>It is a shared space where you can collaborate with your team. You can always rename it later.</h2>
                    <div className='flex gap-4 items-center mt-8'>
                        <EmojiPickerComponent setEmojiIcon={(v: string) => setEmoji(v)}>
                            <Button variant={'outline'}>
                                {emoji ? emoji : <SmilePlus />}
                            </Button>
                        </EmojiPickerComponent>
                        <Input value={workspacename} placeholder='WorkSpace name' onChange={(e) => setWorkspacename(e.target.value)} />
                    </div>
                    <div className='mt-4 flex items-center justify-end gap-4'>
                        <Button disabled={!workspacename.length || loading} onClick={onCreateWorkSpace}>
                            Create
                            {loading && <Loader2Icon className='animate-spin ml-2' />}
                        </Button>
                        <Button variant={'outline'}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkSpace;
