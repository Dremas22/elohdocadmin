
import { NextResponse } from "next/server"; 
import { db } from "@/db/server"; // Ensure this is the correct import for your server-side database

export async function GET() {
  try {
    const driversref = await db?.collection("drivers").get();
    const drivers = driversref.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate().toISOString() || null,
    }))

    return NextResponse.json(drivers, {status: 200});
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch drivers" }), {
      status: 500,
    });
  }
}
