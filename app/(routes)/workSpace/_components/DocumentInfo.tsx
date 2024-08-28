'use client'
import CoverPicker from '@/app/_comoponents/CoverPicker'
import EmojiPickerComponent from '@/app/_comoponents/EmojiPicker';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Params {
    DocumentId: string;
}
interface DocumentData {
    documentName?: string;
    [key: string]: any; // Additional properties if needed
}

function DocumentInfo({ params }: { params: Params }) {
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [coverImage, setCoverImage] = useState('/cover.webp');
    const [documentInfo, setDocumentInfo] = useState<DocumentData | undefined>();

    useEffect(() => {
        // console.log(params.params.DocumentId)
        GetDocumentInfo();
    }, [params]);

    // Used to get document info
    const GetDocumentInfo = async () => {
        try {
            const docRef = doc(db, 'workSpaceDocument', params?.params.DocumentId);
            const docsnap = await getDoc(docRef);
            if (docsnap.exists()) {
                setDocumentInfo(docsnap.data() as DocumentData);
                // console.log(docsnap.data())
                setEmoji(docsnap.data()?.emoji)
                if (docsnap.data()?.coverImage)
                    setCoverImage(docsnap.data()?.coverImage)
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    }
   const UpdateDocumentInfo = async (key: any, value: any) => {
    try {
        const docRef = doc(db, 'workSpaceDocument', params?.params?.DocumentId);
        await updateDoc(docRef, {
            [key]: value
        });
        console.log("Document Updated");
        toast({
            title: "Success",
            description: `${key} updated successfully`,
          })
    } catch (error) {
        console.error("Error updating document:", error);
        toast({
            title: "Failure ",
            description: `fail while updating  ${key}`,
          })
    }
}

    return (
        <div>
            {/* Cover */}
            <CoverPicker setNewCover={(cover: string) => {
                setCoverImage(cover)
                UpdateDocumentInfo('coverImage', cover)
            }}>
                <div className='relative group cursor-pointer'>
                    <h1 className='hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center text-white bg-black bg-opacity-50'>
                        Change Image
                    </h1>
                    <div>
                        {coverImage && (
                            <Image
                                src={coverImage}
                                alt='coverImage'
                                width={400}
                                height={400}
                                className='w-full h-[200px] object-cover rounded-lg group-hover:opacity-50'
                            />
                        )}
                    </div>
                </div>
            </CoverPicker>

            {/* Emoji Picker */}
            <div className='absolute ml-10 mt-[-40px] cursor-pointer'>
                <EmojiPickerComponent
                    className='cursor-pointer'
                    setEmojiIcon={(emoji: string) => {
                        setEmoji(emoji)
                        UpdateDocumentInfo('emoji', emoji)
                    }}
                >
                    <div className="bg-[#ffffffb7] p-4 rounded-md">
                        {emoji ? (
                            <span className='text-5xl'>{emoji}</span>
                        ) : (
                            <SmilePlus className='h-4 w-4 text-gray-800' />
                        )}
                    </div>
                </EmojiPickerComponent>
            </div>

            {/* File Name */}
            <div className='mt-10 p-10 flex items-center gap-4'>
                <input
                    type="text"
                    placeholder="Untitled Document"
                    defaultValue={documentInfo?.documentName || 'Untitled Document'}
                    className='font-bold outline-none text-4xl border'
                    onBlur={(e)=>{
                        UpdateDocumentInfo('documentName',e.target.value)
                        console.log(e.target.value)}}
                />
                <Button>+</Button>
            </div>
        </div>
    )
}

export default DocumentInfo;
