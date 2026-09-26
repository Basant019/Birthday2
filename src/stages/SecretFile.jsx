import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BASANT, PHOTOS } from '../data/basantData'
import { PrimaryButton, StageHeading } from '../components/UI'
import { burstConfetti } from '../utils/confetti'

export default function SecretFile({ state, update, onNext }) {
  const [code, setCode] = useState('')
  const [unlocked, setUnlocked] = useState(state.secretUnlocked)
  const [showHint, setShowHint] = useState(false)
  const [error, setError] = useState(false)

  const tryUnlock = () => {
    if (code.trim().toUpperCase() === BASANT.secretCode) {
      setUnlocked(true)
      update({ secretUnlocked: true })
      burstConfetti()
    } else {
      setError(true)
      setTimeout(() => setError(false), 900)
    }
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">🔐 Basant Security System</StageHeading>
      <motion.div
        animate={error ? { x: [0, -8, 8, -8, 0] } : {}}
        className="w-full max-w-md rounded-2xl bg-black border border-glow-purple/40 p-5 font-mono text-sm text-green-400 mb-6 shadow-glass"
      >
        <p>{'>'} ACCESS LEVEL: CLASSIFIED</p>
        {!unlocked ? (
          <>
            <p className="mt-2">{'>'} ENTER SECRET CODE:</p>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
              className="w-full mt-2 bg-black border border-green-500/40 rounded px-3 py-2 text-green-300 outline-none focus:border-green-400"
              placeholder="_____"
              autoCapitalize="characters"
            />
            <button
              onClick={() => setShowHint((h) => !h)}
              className="text-green-500/70 underline text-xs mt-3 block"
            >
              {showHint ? 'Hint: it\'s her nickname + her birthday date 👀' : 'Need a hint?'}
            </button>
          </>
        ) : (
          <p className="mt-2 text-green-300">{'>'} ACCESS GRANTED. ✅</p>
        )}
      </motion.div>

      {!unlocked ? (
        <PrimaryButton onClick={tryUnlock} className="max-w-xs" disabled={!code.trim()}>
          Unlock
        </PrimaryButton>
      ) : (
        <div className="text-center">
          <img
            src={PHOTOS.cute[0]}
            alt="classified"
            className="w-40 h-40 object-cover rounded-2xl mx-auto mb-4 border border-white/10"
          />
          <p className="font-display text-lg mb-5">
            Congratulations. You found the classified Basant file.
          </p>
          <PrimaryButton onClick={onNext} className="max-w-xs">
            Continue
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
