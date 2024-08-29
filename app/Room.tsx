"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export function Room({ children, params }: { children: ReactNode; params: any }) {
    const liveblocksApiKey = process.env.NEXT_PUBLIC_LIVEBLOCK_Pk;
    const documentId = params?.DocumentId;

    if (!liveblocksApiKey) {
        console.error("NEXT_PUBLIC_LIVEBLOCK_Pk is not defined");
        return <div>Configuration error: Missing API key</div>;
    }

    if (!documentId) {
        console.error("Document ID is missing");
        return <div>Error: Missing Document ID</div>;
    }

    return (
        <LiveblocksProvider
            resolveUsers={async ({ userIds }) => {
                console.log("User IDs:", userIds);
                try {
                    const q = query(collection(db, "LoopUsers"), where("email", "in", userIds));
                    const querySnapshot = await getDocs(q);

                    const users = querySnapshot.docs.map((doc) => doc.data());
                    return users;
                } catch (error) {
                    console.error("Failed to resolve users:", error);
                    return [];
                }
            }}
            resolveMentionSuggestions={async ({ text, roomId }) => {
                try {
                    // Ensure text is defined and is a string before performing operations
                    const searchText = typeof text === "string" ? text.trim() : "";

                    console.log("Searching for text:", searchText);

                    const q = query(collection(db, "LoopUsers"), where("email", "!=", null));
                    const querySnapshot = await getDocs(q);

                    let userList: any = [];
                    querySnapshot.forEach((doc) => {
                        userList.push(doc.data());
                    });

                    console.log("All users:", userList);

                    if (searchText) {
                        const lowerCaseText = searchText.toLowerCase();
                        userList = userList.filter((user: any) =>
                            user.name.toLowerCase().includes(lowerCaseText)
                        );
                    }

                    console.log("Filtered users:", userList);

                    return userList.map((user: any) => user.email);
                } catch (error) {
                    console.error("Failed to resolve mention suggestions:", error);
                    return [];
                }
            }}
            authEndpoint={"/api/liveblocks-auth?roomId="+params?.Documentid}
        >
            <RoomProvider id={documentId}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
