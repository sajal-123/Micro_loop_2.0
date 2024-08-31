import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocksSecret = process.env.LIVE_BLOCK_SK;

if (!liveblocksSecret) {
    throw new Error("LIVE_BLOCK_SK environment variable is not set.");
}

const liveblocks = new Liveblocks({
    secret: liveblocksSecret,
});

export async function POST(request: Request) {
    try {
        // Get the current user from Clerk
        const user = await currentUser();

        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const userEmail = user.primaryEmailAddress?.emailAddress;
        if (!userEmail) {
            return new Response("User email is missing", { status: 400 });
        }
        // Start an auth session inside your endpoint
        const session =await liveblocks.prepareSession(userEmail);
        
        const { room } = await request.json();
        const { searchParams } = new URL(request.url);
        const roomId = searchParams.get("roomId");

        if (!roomId) {
            return new Response("Room ID is missing", { status: 400 });
        }

        console.log("room->", room, roomId);
        
        session.allow(roomId, session.FULL_ACCESS);

        // Authorize the user and return the result
        const { status, body } = await session.authorize();
        return new Response(body, { status });

    } catch (error) {
        console.error("Error authorizing session:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
