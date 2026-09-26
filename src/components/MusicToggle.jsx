import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUDIO_SOURCES = [
  'audio/birthday.mp3',
  'music/theme.mp3',
]

const VOL_STORAGE_KEY = 'tannu-birthday-volume'

export default function MusicToggle({ musicOn, setMusicOn }) {
  const audioRef = useRef(null)
  const [sourceIdx, setSourceIdx] = useState(0)
  const [isAvailable, setIsAvailable] = useState(true)
  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(VOL_STORAGE_KEY)
      return saved !== null ? parseFloat(saved) : 0.5
    } catch {
      return 0.5
    }
  })
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    try {
      localStorage.setItem(VOL_STORAGE_KEY, volume.toString())
    } catch {}
  }, [volume])

  // Handle source fallback if missing
  const handleError = () => {
    if (sourceIdx + 1 < AUDIO_SOURCES.length) {
      setSourceIdx((i) => i + 1)
    } else {
      setIsAvailable(false)
      if (musicOn) setMusicOn(false)
    }
  }

  const handleCanPlay = () => {
    setIsAvailable(true)
    if (musicOn && audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay until user gesture
      })
    }
  }

  // Sync state with play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isAvailable) return

    if (musicOn) {
      audio.volume = volume
      audio.play().catch(() => {
        setMusicOn(false)
      })
    } else {
      audio.pause()
    }
  }, [musicOn, isAvailable])

  // Listen for smooth birthday reveal audio volume transition
  useEffect(() => {
    const handleBirthdayReveal = () => {
      const audio = audioRef.current
      if (!audio || !musicOn) return

      // Smoothly transition volume up slightly over 2.5s
      const startVol = audio.volume
      const targetVol = Math.min(1.0, Math.max(startVol + 0.2, 0.75))
      const startTime = performance.now()
      const duration = 2500

      const fadeInterval = requestAnimationFrame(function step(now) {
        const elapsed = now - startTime
        const progress = Math.min(1, elapsed / duration)
        const current = startVol + (targetVol - startVol) * progress
        audio.volume = current
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setVolume(targetVol)
        }
      })
    }

    window.addEventListener('birthday-reveal-started', handleBirthdayReveal)
    return () => window.removeEventListener('birthday-reveal-started', handleBirthdayReveal)
  }, [musicOn])

  const toggleMusic = () => {
    if (!isAvailable) return
    const nextState = !musicOn
    setMusicOn(nextState)
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center space-x-2"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SOURCES[sourceIdx]}
        loop
        onCanPlay={handleCanPlay}
        onError={handleError}
      />

      {/* Volume Slider Dropdown/Popup */}
      <AnimatePresence>
        {showVolumeSlider && isAvailable && musicOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10 }}
            className="glass rounded-full px-3 py-1.5 flex items-center space-x-2 shadow-glass border border-white/20"
          >
            <span className="text-xs">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1.5 accent-glow-pink bg-white/20 rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
            <span className="text-xs">🔊</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Button */}
      {!isAvailable ? (
        <button
          disabled
          title="Add public/audio/birthday.mp3 to enable music."
          className="glass rounded-full px-4 py-2 text-xs font-semibold flex items-center space-x-2 border border-white/10 opacity-50 cursor-not-allowed text-warmwhite/70"
        >
          <span>🎵</span>
          <span>Music OFF</span>
        </button>
      ) : (
        <div className="flex items-center space-x-1 glass rounded-full p-1 border border-white/20 shadow-glass">
          <button
            onClick={toggleMusic}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center space-x-2 transition active:scale-95 ${
              musicOn ? 'bg-gradient-to-r from-glow-pink to-glow-purple text-dark-900 font-bold shadow-md' : 'text-warmwhite/80 hover:bg-white/10'
            }`}
            aria-label="Toggle background music"
          >
            <span>🎵</span>
            <span>{musicOn ? 'Music ON' : 'Music OFF'}</span>
          </button>

          {musicOn && (
            <button
              onClick={() => setShowVolumeSlider((prev) => !prev)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-warmwhite/80 hover:bg-white/10 transition text-xs"
              title="Adjust Volume"
            >
              ⚙️
            </button>
          )}
        </div>
      )}
    </div>
  )
}
