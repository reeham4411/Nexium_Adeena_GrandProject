import { useEffect, useState } from "react";
import { connectToDatabase } from "../lib/mongodb";

interface Log {
  mood: string;
  recommendation: string;
  date: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const res = await fetch("/api/getLogs");
      const data = await res.json();
      setLogs(data);
    }
    fetchLogs();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Mood Logs</h1>
      {logs.map((log, i) => (
        <div key={i} className="border p-4 rounded mb-2">
          <p>
            <strong>Mood:</strong> {log.mood}
          </p>
          <p>
            <strong>Advice:</strong> {log.recommendation}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(log.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
