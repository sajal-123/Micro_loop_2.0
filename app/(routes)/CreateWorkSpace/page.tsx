'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { SmilePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
function CreateWorkSpace() {
    const [coverImage, setCoverImage] = useState('/cover.webp')
    const [workspacename,setWorkspacename]=useState('')
    return (
        <div className='p-10 py-28 md:px-24 lg:px-64 xl:px-96 overflow-hidden'>
            <div className='shadow-2xl border-2 rounded-lg'>
                {/* Cover Image */}
                <div className=' relative group cursor-pointer'>
                    <h1 className='hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center'>Change Image</h1>
                    <div>
                        <Image src={coverImage} alt='coverImage' width={400} height={400} className='w-full h-[150px] object-cover rounded-lg group-hover:opacity-50'></Image>
                    </div>
                </div>
                {/* Input Section */}
                <div className='p-12'>
                    <h1 className='font-medium text-xl'>
                        Create a new WorkSpace
                    </h1>
                    <h2 className='text-sm mt-2'> It is sahred space  where you can collaborate your team. You always rename it later</h2>
                    <div className='flex gap-4 items-center mt-8'>
                    <Button variant={'outline'}>
                        <SmilePlus />
                    </Button>
                    <Input value={workspacename} placeholder='WorkSpace name' onChange={(e)=>setWorkspacename(e.target.value)} />
                </div>
                <div className='mt-4 flex items-center justify-end gap-4'>
                    <Button disabled={!workspacename.length}>Create</Button>
                    <Button variant={'outline'}>Cancel</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkSpace
