import { useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [sessionId, setSessionId] = useState("");
  const [msg, setMsg] = useState("");

  const generateReport = async () => {
    try {
      const res = await API.post("/report/generate", { session_id: sessionId });
      setMsg(`✅ Report generated at: ${res.data.path}`);
    } catch (err: any) {
      setMsg("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <input
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        placeholder="Enter session_id"
        className="border p-2 mr-2"
      />
      <button
        onClick={generateReport}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Report
      </button>
      <p className="mt-4">{msg}</p>
    </div>
  );
}
