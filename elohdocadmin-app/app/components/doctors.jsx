"use client";

import { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/get-doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const approveDoctor = async (userId) => {
    const res = await fetch("/api/verifydoctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId: userId, isValid: true }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Doctor approved.");
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.userId === userId ? { ...doc, isVerified: true } : doc
        )
      );
    } else {
      alert("Failed to approve: " + result.error);
    }
  };

  const declineDoctor = async (userId) => {
    const res = await fetch("/api/verifydoctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId: userId, isValid: null }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Doctor declined.");
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.userId === userId ? { ...doc, isVerified: null } : doc
        )
      );
    } else {
      alert("Failed to decline: " + result.error);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  console.log("Doctors:", doctors);

  return (
    <div className="mt-10 w-full max-w-4xl bg-white p-4 sm:p-6 rounded text-black ">
  <h2 className="text-xl sm:text-2xl font-bold mb-6 break-words text-center sm:text-left">
        Unverified Doctors
      </h2>

      {doctors.length === 0 && <p>No doctors found.</p>}

      {doctors.map((doc) => (
        <div
          key={doc.userId}
          className="border p-4 rounded mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div>
            <p>
              <strong>Name:</strong> {doc.fullName}
            </p>
            <p>
              <strong>Practice Number:</strong> {doc.practiceNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {doc.isVerified === true
                ? "✅ Verified"
                : doc.isVerified === null
                ? "⚠️ Declined"
                : "❌ Not Verified"}
            </p>
          </div>

          {doc.isVerified !== true && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => approveDoctor(doc.userId)}
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer text-sm sm:text-base"
              >
                Approve
              </button>
              <button
                onClick={() => declineDoctor(doc.userId)}
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer text-sm sm:text-base"
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
