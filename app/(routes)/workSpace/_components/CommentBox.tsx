'use client'
import React from 'react'
import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
function CommentBox() {
    const { threads } = useThreads();

    return (
        <div className='w-[300px] shadow-lg h-[350px] rounded-lg'>
            {threads.map((thread) => (
                <Thread key={thread.id} thread={thread} />
            ))}
            <Composer />
        </div>
    )
}

export default CommentBox
