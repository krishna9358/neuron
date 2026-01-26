"use client";

import { useCallback, useRef, useEffect } from "react";

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
}

/**
 * A React hook for playing sound effects with click/UI interactions.
 * Preloads the audio file for instant playback.
 *
 * @param src - Path to the audio file (e.g., "/audio/click.mp3")
 * @param options - Optional settings for volume and playbackRate
 * @returns A function that plays the sound when called
 *
 * @example
 * const playClick = useSound("/audio/click.mp3");
 * <button onClick={playClick}>Click me</button>
 */
export function useSound(src: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const poolSize = 3; // Allow overlapping sounds

  // Preload audio on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Create audio pool for overlapping playback
    audioPoolRef.current = Array.from({ length: poolSize }, () => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume;
      audio.playbackRate = playbackRate;
      return audio;
    });

    // Cleanup
    return () => {
      audioPoolRef.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioPoolRef.current = [];
    };
  }, [src, volume, playbackRate]);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;

    // Find an available audio element (not currently playing)
    const availableAudio = audioPoolRef.current.find(
      (audio) => audio.paused || audio.ended,
    );

    if (availableAudio) {
      availableAudio.currentTime = 0;
      availableAudio.volume = volume;
      availableAudio.playbackRate = playbackRate;
      availableAudio.play().catch((err) => {
        // Silently handle autoplay restrictions
        console.debug("Sound playback prevented:", err.message);
      });
    } else if (audioPoolRef.current[0]) {
      // If all are playing, restart the first one
      const audio = audioPoolRef.current[0];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [volume, playbackRate]);

  return play;
}

export default useSound;
