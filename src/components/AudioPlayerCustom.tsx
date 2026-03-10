"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
    src: string;
    title: string;
    description?: string;
    coverImage?: string;
}

export default function AudioPlayerCustom({ src, title, description, coverImage }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);

    // React gère mieux les events via onTimeUpdate et onLoadedMetadata
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            // Fallback pour la durée si preload n'a pas trigger
            if (duration === 0 && audioRef.current.duration && !isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration)) {
                setDuration(audioRef.current.duration);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration) && isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error("Erreur de lecture audio:", error);
                    setIsPlaying(false);
                });
            } else {
                setIsPlaying(true);
            }
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) audioRef.current.currentTime = time;
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || !isFinite(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="glass-ovni p-8 rounded-[2.5rem] border border-[var(--theme-text)]/10 shadow-2xl relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />


            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                {/* Cover Image Placeholder */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-[var(--theme-text)]/5 flex items-center justify-center border border-[var(--theme-text)]/10 shrink-0">
                    {coverImage ? (
                        <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <Headphones className="w-12 h-12 text-[var(--theme-accent)]/40" />
                    )}
                </div>

                <div className="flex-1 w-full space-y-6">
                    <div>
                        <h3 className="font-serif-display text-2xl mb-2 text-[var(--theme-text)]">{title}</h3>
                        <p className="font-sans text-sm text-[var(--theme-text)]/50 font-light leading-relaxed">
                            {description || "Séance d'hypnose guidée pour votre transformation physique et mentale."}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-[var(--theme-text)]/10 rounded-full appearance-none cursor-pointer accent-[var(--theme-accent)]"
                        />
                        <div className="flex justify-between text-[10px] font-sans font-bold tracking-widest text-[var(--theme-text)]/30 uppercase">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <button onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10; }}
                                className="p-3 rounded-full hover:bg-[var(--theme-text)]/5 transition-colors text-[var(--theme-text)]/40 hover:text-[var(--theme-text)]">
                                <SkipBack className="w-5 h-5" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-[var(--theme-accent)] text-[var(--theme-bg)] flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-[var(--theme-accent)]/20"
                            >
                                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                            </button>

                            <button onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10; }}
                                className="p-3 rounded-full hover:bg-[var(--theme-text)]/5 transition-colors text-[var(--theme-text)]/40 hover:text-[var(--theme-text)]">
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-3 bg-[var(--theme-text)]/5 p-3 rounded-2xl border border-[var(--theme-text)]/10">
                            <Volume2 className="w-4 h-4 text-[var(--theme-text)]/30" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => {
                                    const v = parseFloat(e.target.value);
                                    setVolume(v);
                                    if (audioRef.current) audioRef.current.volume = v;
                                }}
                                className="w-20 h-1 bg-[var(--theme-text)]/10 rounded-full appearance-none cursor-pointer accent-[var(--theme-text)]/40"
                            />
                        </div>

                        <a
                            href={src}
                            download
                            className="p-4 rounded-2xl bg-[var(--theme-text)]/5 border border-[var(--theme-text)]/10 text-[var(--theme-text)]/40 hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all"
                            title="Télécharger l'audio"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
