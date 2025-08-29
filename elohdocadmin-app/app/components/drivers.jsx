"use client";

import { useEffect, useState } from "react";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/get-drivers");
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const approveDriver = async (userId) => {
    const res = await fetch("/api/verifydrivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverId: userId, isValid: true }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Driver approved.");
      setDrivers((prev) =>
        prev.map((drv) =>
          drv.userId === userId ? { ...drv, isVerified: true } : drv
        )
      );
    } else {
      alert("Failed to approve: " + result.error);
    }
  };

  const declineDriver = async (userId) => {
    const res = await fetch("/api/verifydrivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverId: userId, isValid: null }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Driver declined.");
      setDrivers((prev) =>
        prev.map((drv) =>
          drv.userId === userId ? { ...drv, isVerified: null } : drv
        )
      );
    } else {
      alert("Failed to decline: " + result.error);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  console.log("Drivers:", drivers);

  return (
    <div className="mt-10 w-full max-w-4xl bg-white p-4 sm:p-6 rounded text-black">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 break-words text-center sm:text-left">
        Unverified Drivers
      </h2>

      <button
        onClick={() => {
          window.history.back();
          window.location.reload();
        }}
        className="mr-2 text-xl"
      >
        Back
      </button>

      {drivers.length === 0 && <p>No drivers found.</p>}

      {drivers.map((drv) => (
        <div
          key={drv.userId}
          className="border p-4 rounded mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div>
            <p>
              <strong>Name:</strong> {drv.fullName}
            </p>
            <p>
              <strong>License Number:</strong> {drv.licenseNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {drv.isVerified === true
                ? "✅ Verified"
                : drv.isVerified === null
                ? "⚠️ Declined"
                : "❌ Not Verified"}
            </p>
          </div>

          {drv.isVerified !== true && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => approveDriver(drv.userId)}
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer text-sm sm:text-base"
              >
                Approve
              </button>
              <button
                onClick={() => declineDriver(drv.userId)}
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
