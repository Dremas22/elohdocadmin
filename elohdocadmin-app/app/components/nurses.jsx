"use client";

import { useEffect, useState } from "react";

export default function Nurses() {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNurses = async () => {
    try {
      const res = await fetch("/api/get-nurses");
      const data = await res.json();
      setNurses(data);
    } catch (err) {
      console.error("Error fetching nurses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  const approveNurse = async (userId) => {
    const res = await fetch("/api/verifynurses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nurseId: userId, isValid: true }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Nurse approved.");
      setNurses((prev) =>
        prev.map((item) =>
          item.userId === userId ? { ...item, isVerified: true } : item
        )
      );
    } else {
      alert("Failed to approve: " + result.error);
    }
  };

  const declineNurse = async (userId) => {
    const res = await fetch("/api/verifynurses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nurseId: userId, isValid: null }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Nurse declined.");
      setNurses((prev) =>
        prev.map((item) =>
          item.userId === userId ? { ...item, isVerified: null } : item
        )
      );
    } else {
      alert("Failed to decline: " + result.error);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  console.log("Nurses:", nurses);

  return (
    <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-6">Unverified Nurses</h2>

      
      <button
        onClick={() => {
          window.history.back(); // go back
          window.location.reload(); // force refresh
        }}
        className="mr-2 text-xl"
      >
        ←
      </button>

      {nurses.length === 0 && <p>No nurses found.</p>}

      {nurses.map((item) => (
  <div
    key={item.userId}
    className="border p-4 rounded mb-4 flex justify-between items-center"
  >
    <div>
      <p>
        <strong>Name:</strong> {item.fullName}
      </p>
      <p>
        <strong>Practice Number:</strong> {item.practiceNumber}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {item.isVerified === true
          ? "✅ Verified"
          : item.isVerified === null
          ? "⚠️ Declined"
          : "❌ Not Verified"}
      </p>
    </div>

    {item.isVerified !== true && (
      <div className="flex gap-2">
        <button
          onClick={() => approveNurse(item.userId)}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Approve
        </button>
        <button
          onClick={() => declineNurse(item.userId)}
          className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Decline
        </button>
      </div>
    )}
  </div>
))}

    </div>
  );
}
