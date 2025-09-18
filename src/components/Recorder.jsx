import { useState, useRef } from "react";
import API from "../api";

export default function Recorder({ onDone }) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    chunksRef.current = [];
    mr.ondataavailable = (e) => chunksRef.current.push(e.data);
    mr.start();
    setRecording(true);
  }

  function stopRecording() {
    const mr = mediaRecorderRef.current;
    if (!mr) return;
    mr.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], `recording_${Date.now()}.webm`, {
        type: blob.type,
      });
      await uploadFile(file);
      setRecording(false);
    };
    mr.stop();
  }

  async function uploadFile(file) {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);
      const resp = await API.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onDone && onDone(resp.data.record);  // Call the parent component's callback with the uploaded file
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    await uploadFile(file);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => (recording ? stopRecording() : startRecording())}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {recording ? "Stop" : "Record"}
        </button>
        <label className="px-4 py-2 rounded bg-gray-200 cursor-pointer">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          Upload audio
        </label>
        {loading && <div className="text-sm text-gray-500">Transcribing...</div>}
      </div>
    </div>
  );
}