export default function TranscriptionCard({ item }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="text-xs text-gray-500">
        {new Date(item.created_at).toLocaleString()}
      </div>
      <div className="font-semibold mt-2">{item.filename}</div>
      <audio className="mt-2 w-full" controls src={item.audio_public_url}></audio>
      <div className="mt-3 text-sm whitespace-pre-wrap">
        {item.transcription || "No transcription yet"}
      </div>
    </div>
  );
}