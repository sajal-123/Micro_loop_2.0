'use client'
import React from 'react'
import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
function CommentBox() {
    const { threads } = useThreads();

    return (
        <div className='w-[300px] h-[350px] shadow-lg 
    rounded-lg overflow-auto z-30 '>
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
            <Composer />
        </div>
    )
}

export default CommentBox
