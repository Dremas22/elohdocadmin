
import { NextResponse } from "next/server"; 
import { db } from "@/db/server"; // Ensure this is the correct import for your server-side database

export async function GET() {
  try {
    const nursesref = await db?.collection("nurses").get();
    const nurses = nursesref.docs.map((item) => ({
        userId: item.id,
        ...item.data(),
        createdAt: item.data().createdAt?.toDate().toISOString() || null,
        updatedAt: item.data().updatedAt?.toDate().toISOString() || null,
    }))

    return NextResponse.json(nurses, {status: 200});
  } catch (error) {
    console.error("Error fetching nurses:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch nurses" }), {
      status: 500,
    });
  }
}
