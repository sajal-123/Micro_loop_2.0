'use client'
import CoverPicker from '@/app/_comoponents/CoverPicker'
import EmojiPickerComponent from '@/app/_comoponents/EmojiPicker';
import { SmilePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

function DocumentInfo() {
    const [emoji, setEmoji] = useState<string | undefined>(undefined);
    const [coverImage, setCoverImage] = useState('/cover.webp');
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
            <div className=' absolute ml-10 mt-[-40px]'>
            <EmojiPickerComponent className='cursor-pointer' setEmojiIcon={(v: string) => setEmoji(v)}>
                <div className="bg-[#ffffffb0] p-4 rounded-md">
                    {emoji ? emoji : <SmilePlus className='h-10 w-10 text-gray-800' />}
                </div>
            </EmojiPickerComponent>
            </div>
            {/* File Name */}

        </div>
    )
}

export default DocumentInfo
