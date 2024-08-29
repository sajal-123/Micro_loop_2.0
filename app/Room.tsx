"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children, params }: { children: ReactNode, params: any }) {
    const liveblocksApiKey = process.env.NEXT_PUBLIC_LIVEBLOCK_Pk;
    console.log(params.DocumentId)

    if (!liveblocksApiKey) {
        console.error("NEXT_PUBLIC_LIVEBLOCK_Pk is not defined");
        return <div>Configuration error: Missing API key</div>;
    }

    return (
        <LiveblocksProvider 
        authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={params?.DocumentId}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
