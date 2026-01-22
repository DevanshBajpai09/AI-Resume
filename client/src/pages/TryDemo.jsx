import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowLeft } from "lucide-react";

const TryDemo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const goBack = () => {
    window.history.back();
  };

  return (
    <section className="relative min-h-screen bg-white px-4 py-24 overflow-hidden">
        <button
        onClick={goBack}
        className="fixed top-6 left-6 z-20 flex items-center gap-2
                   px-3 py-2 rounded-lg
                   bg-white/80 backdrop-blur
                   border border-gray-300
                   cursor-pointer
                   text-emerald-700
                   shadow-md
                   hover:bg-gray-100 transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>
      
      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 blur-[120px] opacity-25" />
      </div>

      {/* Heading */}
      <div className="relative text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold mb-2">
          <Sparkles size={18} />
          Live Product Demo
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          See the product in action
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Watch a short demo showcasing how the platform works and what makes it powerful.
        </p>
      </div>

      {/* Video card */}
      <div className="relative group mb-24 flex justify-center">
        
        {/* Glow */}
        <div className="absolute -inset-2 rounded-2xl 
                        bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400
                        blur-2xl opacity-20
                        transition-all duration-700
                        group-hover:opacity-40 group-hover:blur-3xl" />

        <div className="relative bg-white rounded-2xl shadow-2xl 
                        border border-emerald-200 
                        overflow-hidden w-full max-w-4xl">

          {/* Video */}
          <video
            ref={videoRef}
            src="https://lnlp4pf1nbxqmmvo.public.blob.vercel-storage.com/Devansh%27s%20video.mp4"
            className="w-full"
            playsInline
          />

          {/* Controls */}
          <div className="flex items-center justify-between px-5 py-5 bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <span className="text-sm text-gray-400">
              Product Demo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryDemo;
