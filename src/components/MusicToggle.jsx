import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AUDIO_SOURCES = [
  'audio/birthday.mp3',
  'music/theme.mp3',
]

const VOL_STORAGE_KEY = 'tannu-birthday-volume'

// Happy Birthday & Cozy Lofi Chime melody frequencies
const BIRTHDAY_NOTES = [
  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 293.66, duration: 0.8 }, // D4
  { freq: 261.63, duration: 0.8 }, // C4
  { freq: 349.23, duration: 0.8 }, // F4
  { freq: 329.63, duration: 1.2 }, // E4

  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 293.66, duration: 0.8 }, // D4
  { freq: 261.63, duration: 0.8 }, // C4
  { freq: 392.00, duration: 0.8 }, // G4
  { freq: 349.23, duration: 1.2 }, // F4

  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 261.63, duration: 0.4 }, // C4
  { freq: 523.25, duration: 0.8 }, // C5
  { freq: 440.00, duration: 0.8 }, // A4
  { freq: 349.23, duration: 0.8 }, // F4
  { freq: 329.63, duration: 0.8 }, // E4
  { freq: 293.66, duration: 1.2 }, // D4

  { freq: 466.16, duration: 0.4 }, // Bb4
  { freq: 466.16, duration: 0.4 }, // Bb4
  { freq: 440.00, duration: 0.8 }, // A4
  { freq: 349.23, duration: 0.8 }, // F4
  { freq: 392.00, duration: 0.8 }, // G4
  { freq: 349.23, duration: 1.6 }, // F4
]

export default function MusicToggle({ musicOn, setMusicOn }) {
  const audioRef = useRef(null)
  const synthCtxRef = useRef(null)
  const synthGainRef = useRef(null)
  const synthTimerRef = useRef(null)

  const [sourceIdx, setSourceIdx] = useState(0)
  const [useSynth, setUseSynth] = useState(false)
  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(VOL_STORAGE_KEY)
      return saved !== null ? parseFloat(saved) : 0.5
    } catch {
      return 0.5
    }
  })
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Sync volume
  useEffect(() => {
    if (audioRef.current && !useSynth) {
      audioRef.current.volume = volume
    }
    if (synthGainRef.current && synthCtxRef.current) {
      synthGainRef.current.gain.setValueAtTime(volume * 0.2, synthCtxRef.current.currentTime)
    }
    try {
      localStorage.setItem(VOL_STORAGE_KEY, volume.toString())
    } catch {}
  }, [volume, useSynth])

  // Handle fallback to Web Audio Synth if MP3 is missing
  const handleAudioError = () => {
    if (sourceIdx + 1 < AUDIO_SOURCES.length) {
      setSourceIdx((i) => i + 1)
    } else {
      // Both MP3 paths missing — switch to built-in synthesized music!
      setUseSynth(true)
    }
  }

  // Web Audio Synth Player
  const startSynth = () => {
    if (synthTimerRef.current) clearInterval(synthTimerRef.current)
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) return
      if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') {
        synthCtxRef.current = new AudioContextClass()
      }
      const ctx = synthCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(volume * 0.2, ctx.currentTime)
      masterGain.connect(ctx.destination)
      synthGainRef.current = masterGain

      let noteIdx = 0

      const playNextNote = () => {
        if (!musicOn) return
        const note = BIRTHDAY_NOTES[noteIdx]
        const osc = ctx.createOscillator()
        const noteGain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime)

        // Soft music box envelope
        noteGain.gain.setValueAtTime(0.001, ctx.currentTime)
        noteGain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.05)
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.duration)

        osc.connect(noteGain)
        noteGain.connect(masterGain)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + note.duration + 0.1)

        noteIdx = (noteIdx + 1) % BIRTHDAY_NOTES.length
      }

      playNextNote()
      synthTimerRef.current = setInterval(playNextNote, 600)
    } catch (e) {
      console.error('Web Audio Synth failed', e)
    }
  }

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current)
      synthTimerRef.current = null
    }
    if (synthCtxRef.current && synthCtxRef.current.state !== 'closed') {
      try {
        synthCtxRef.current.suspend()
      } catch {}
    }
  }

  // Play / Pause music engine
  useEffect(() => {
    if (musicOn) {
      if (useSynth) {
        startSynth()
      } else if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.play().catch(() => {
          // If browser blocks audio playback or fails, fallback to synth
          setUseSynth(true)
          startSynth()
        })
      }
    } else {
      if (useSynth) {
        stopSynth()
      } else if (audioRef.current) {
        audioRef.current.pause()
      }
    }

    return () => {
      if (useSynth) stopSynth()
    }
  }, [musicOn, useSynth])

  // Smooth volume boost on birthday reveal stage
  useEffect(() => {
    const handleBirthdayReveal = () => {
      if (!musicOn) return
      const targetVol = Math.min(1.0, Math.max(volume + 0.2, 0.75))

      if (!useSynth && audioRef.current) {
        const startVol = audioRef.current.volume
        const startTime = performance.now()
        requestAnimationFrame(function step(now) {
          const progress = Math.min(1, (now - startTime) / 2500)
          audioRef.current.volume = startVol + (targetVol - startVol) * progress
          if (progress < 1) requestAnimationFrame(step)
          else setVolume(targetVol)
        })
      } else {
        setVolume(targetVol)
      }
    }

    window.addEventListener('birthday-reveal-started', handleBirthdayReveal)
    return () => window.removeEventListener('birthday-reveal-started', handleBirthdayReveal)
  }, [musicOn, volume, useSynth])

  const toggleMusic = () => {
    setMusicOn(!musicOn)
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
        onError={handleAudioError}
      />

      {/* Volume Slider Dropdown */}
      <AnimatePresence>
        {showVolumeSlider && musicOn && (
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

      {/* Main Music Control Button */}
      <div className="flex items-center space-x-1 glass rounded-full p-1 border border-white/20 shadow-glass">
        <button
          onClick={toggleMusic}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center space-x-2 transition active:scale-95 ${
            musicOn
              ? 'bg-gradient-to-r from-glow-pink to-glow-purple text-dark-900 font-bold shadow-md'
              : 'text-warmwhite/80 hover:bg-white/10'
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
    </div>
  )
}
