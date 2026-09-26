import React, { useRef } from 'react'

// Music is OFF by default and never autoplays. If you add an audio file
// at /public/music/theme.mp3 this toggle will play/pause it. Until then
// it just shows a disabled-looking control so the UI is ready.
export default function MusicToggle({ musicOn, setMusicOn }) {
  const audioRef = useRef(null)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
    } else {
      audio.play().catch(() => {})
      setMusicOn(true)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      <audio ref={audioRef} src="music/theme.mp3" loop />
      <button
        onClick={toggle}
        className="glass rounded-full w-11 h-11 flex items-center justify-center text-lg"
        aria-label="Toggle music"
        title="Add music/theme.mp3 to enable"
      >
        {musicOn ? '🔊' : '🔈'}
      </button>
    </div>
  )
}
