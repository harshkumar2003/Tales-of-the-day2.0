import { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Trash2,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

 function VoiceNote({ onTranscription, onAudioSave }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (Recognition) {
      setSpeechSupported(true);
      const rec = new Recognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-IN";
      rec.onresult = (e) => {
        let txt = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) txt += e.results[i][0].transcript + " ";
        }
        txt && setTranscription((p) => p + txt);
      };
      rec.onerror = () => setIsTranscribing(false);
      rec.onend = () => setIsTranscribing(false);
      recognitionRef.current = rec;
    }
    return () => clearInterval(timerRef.current);
  }, []);

  const fmt = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;

      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        onAudioSave && onAudioSave(blob, duration);
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();

      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);

      if (speechSupported) {
        setIsTranscribing(true);
        recognitionRef.current.start();
      }

      toast.success("Recording started");
    } catch {
      toast.error("Mic access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop?.();
    clearInterval(timerRef.current);
    setIsRecording(false);
    toast.success("Recording stopped");
  };

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const clearAll = () => {
    setAudioUrl("");
    setDuration(0);
    setTranscription("");
    setIsPlaying(false);
  };

  const useText = () => {
    if (!transcription.trim()) return;
    onTranscription && onTranscription(transcription.trim());
    toast.success("Transcription added");
    clearAll();
  };

  return (
    <div className="w-full p-5 rounded-xl  bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 space-y-4">
      {/* Title */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Mic className="h-5 w-5" />
          Voice Note
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Record your thoughts
          {speechSupported ? " and convert speech to text" : " (no speech-to-text)"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium"
          >
            <Mic className="inline w-4 h-4 mr-2" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="border border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-950 px-4 py-2 rounded-xl font-medium"
          >
            <MicOff className="inline w-4 h-4 mr-2" />
            Stop Recording
          </button>
        )}

        {isRecording && (
          <div className="flex items-center gap-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono">{fmt(duration)}</span>
          </div>
        )}
      </div>

      {/* Playback */}
      {audioUrl && (
        <>
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={isPlaying ? pause : play}
              className="border px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <span className="text-sm text-gray-500">Duration: {fmt(duration)}</span>

            <button
              onClick={clearAll}
              className="border px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-950"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {/* Transcription */}
      {transcription && (
        <div className="space-y-3">
          <div className="p-3 bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 rounded-lg">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Transcription:
            </p>
            <p className="text-sm mt-1">{transcription}</p>
          </div>
          <button
            onClick={useText}
            className="w-full px-4 py-2 rounded-lg  bg-white/80 dark:bg-black/40 border border-gray-300 dark:border-white/20 hover:dark:bg-black hover:bg-gray-200"
          >
            <FileText className="inline h-4 w-4 mr-2" />
            Use This Text
          </button>
        </div>
      )}

      {/* Status Messages */}
      {isTranscribing && (
        <p className="text-center text-sm text-blue-500 animate-pulse">
          Converting speech to text…
        </p>
      )}

      {!speechSupported && (
        <p className="text-center text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 p-2 rounded">
          Speech‑to‑text not supported in this browser. You can still record audio.
        </p>
      )}
    </div>
  );
}
export default VoiceNote;