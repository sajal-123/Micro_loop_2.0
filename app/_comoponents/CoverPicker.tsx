'use client'
import React, { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import CoverOptions from '../_shared/CoverOptions';
import { Button } from '@/components/ui/button';

interface CoverOption {
    imageUrl: string;
    [key: string]: any; // Adjust this according to the exact structure of CoverOptions
}

interface CoverPickerProps {
    children: React.ReactNode;
    setNewCover: any
}

const CoverPicker: React.FC<CoverPickerProps> = ({ children, setNewCover }) => {
    const [coverPicker, setCoverPicker] = useState('')
    return (
        <div>
            <Dialog>
                <DialogTrigger className="w-full">
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Picture</DialogTitle>
                        <DialogDescription>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8  items-center'>
                                {CoverOptions.map((option: CoverOption, ind: number) => (
                                    <div key={ind} className={`${coverPicker == option?.imageUrl && ' border-primary border-2 rounded-lg overflow-hidden p-1'} `} onClick={() => setCoverPicker(option?.imageUrl)}>
                                        <Image src={option.imageUrl} height={140} width={200} alt="Options" className='cursor-pointer rounded-lg hover:opacity-65 duration-500 h-[70px] object-cover w-full shadow-sm' />
                                    </div>
                                ))}
                            </div>
                        </DialogDescription>
                        <DialogFooter >
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className=''>
                                    Close
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" className="color-primary" onClick={() => setNewCover(coverPicker)}>
                                    Update
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CoverPicker;
