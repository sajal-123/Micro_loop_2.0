'use client'
import CoverPicker from '@/app/_comoponents/CoverPicker'
import EmojiPickerComponent from '@/app/_comoponents/EmojiPicker';
import { db } from '@/config/firebaseConfig';
import { doc } from 'firebase/firestore';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

interface Params {
    [key: string]: any; // Replace 'any' with specific types if known
}
function DocumentInfo(params:Params) {
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [coverImage, setCoverImage] = useState('/cover.webp');

    const GetDocumentInfo=()=>{
        const docRef=doc(db,'workSpaceDocument',params?.DocumentId)
    }

    return (
        <div>
            {/* Cover */}
            <CoverPicker setNewCover={(cover: string) => { setCoverImage(cover) }}>
                <div className='relative group cursor-pointer'>
                    <h1 className='hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center text-white bg-black bg-opacity-50'>Change Image</h1>
                    <div>
                        <Image src={coverImage} alt='coverImage' width={400} height={400} className='w-full h-[200px] object-cover rounded-lg group-hover:opacity-50' />
                    </div>
                </div>
            </CoverPicker>
            {/* Emoji Picker */}
            <div className=' absolute ml-10 mt-[-40px] cursor-pointer'>
            <EmojiPickerComponent className='cursor-pointer' setEmojiIcon={(emoji: string) => setEmoji(emoji )}>
                <div className="bg-[#ffffffb7] p-4 rounded-md">
                    {emoji ?<span className='text-5xl'>{emoji}</span> : <SmilePlus className='h-4 w-4 text-gray-800' />}
                </div>
            </EmojiPickerComponent>
            </div>
            {/* File Name */}
             <div className='mt-10 p-10'>
                <input type="text" placeholder='Untitled Document' defaultValue={'Untitled Document'} className='font-bold outline-none text-4xl' />
             </div>
        </div>
    )
}

export default DocumentInfo
