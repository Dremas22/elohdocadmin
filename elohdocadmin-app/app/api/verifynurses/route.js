// app/api/verify/route.js
import { updateUserField } from "@/lib/query";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nurseId, isValid } = body;

    if (!nurseId || (isValid !== true && isValid !== false && isValid !== null)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid input" }), { status: 400 });
    }

    const result = await updateUserField("nurses", nurseId, {
      isVerified: isValid,
    });

    if (!result.success) {
      return new Response(JSON.stringify({ success: false, error: result.error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: "Verification updated." }), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}