import { useState } from "react";
import Recorder from "../components/Recorder";  // Import Recorder

export default function Dashboard({ user }) {
  const [file, setFile] = useState(null);

  const handleUpload = (file) => {
    setFile(file);
    alert("File uploaded!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="px-8 py-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="text-gray-600">{user?.email}</span>
      </header>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4">Upload & Transcribe</h2>
        <div className="flex gap-4 items-center">
          {/* Pass handleUpload as a prop to Recorder */}
          <Recorder onDone={handleUpload} />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Past Transcriptions</h3>
          <p className="text-gray-600">No history yet...</p>
        </div>
      </main>
    </div>
  );
}