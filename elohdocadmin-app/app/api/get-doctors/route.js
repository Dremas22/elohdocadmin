import { fetchserverCollection } from "@/lib/query";
import { NextResponse } from "next/server"; 
import { db } from "@/db/server"; // Ensure this is the correct import for your server-side database

export async function GET() {
  try {
    const doctorsref = await db?.collection("doctors").get();
    const doctors = doctorsref.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate().toISOString() || null,
    }))

    return NextResponse.json(doctors, {status: 200});
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch doctors" }), {
      status: 500,
    });
  }
}
