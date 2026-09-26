import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PrimaryButton, StageHeading, StageSub } from '../components/UI'
import { burstConfetti } from '../utils/confetti'

const EGGS = [
  { id: 'chess', emoji: '♟️', message: 'Strategic thinking detected.' },
  { id: 'bike', emoji: '🚴', message: 'Adventure mode unlocked.' },
  { id: 'naruto', emoji: '🍥', message: 'Believe it! 🍥' },
  { id: 'pizza', emoji: '🍕', message: 'Correct priority.' },
  { id: 'japan', emoji: '🇯🇵', message: 'Future destination unlocked.' },
]

export default function EggHunt({ state, update, onNext }) {
  const [found, setFound] = useState(new Set(state.eggsFound || []))
  const [toast, setToast] = useState(null)

  const positions = useMemo(
    () =>
      EGGS.map(() => ({
        top: `${10 + Math.random() * 70}%`,
        left: `${8 + Math.random() * 80}%`,
      })),
    []
  )

  const find = (egg) => {
    if (found.has(egg.id)) return
    const next = new Set(found)
    next.add(egg.id)
    setFound(next)
    update({ eggsFound: Array.from(next) })
    setToast(egg.message)
    burstConfetti()
    setTimeout(() => setToast(null), 1400)
  }

  const allFound = found.size === EGGS.length

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Easter Egg Hunt 🔍</StageHeading>
      <StageSub>Tap the {EGGS.length} hidden secrets scattered around. Found: {found.size}/{EGGS.length}</StageSub>

      <div className="relative w-full max-w-md h-[360px] glass rounded-3xl overflow-hidden mb-6">
        {EGGS.map((egg, i) => (
          <motion.button
            key={egg.id}
            style={{ position: 'absolute', top: positions[i].top, left: positions[i].left }}
            animate={found.has(egg.id) ? { scale: 0, opacity: 0 } : { scale: [1, 1.15, 1] }}
            transition={{ repeat: found.has(egg.id) ? 0 : Infinity, duration: 1.6 }}
            onClick={() => find(egg)}
            className="text-3xl active:scale-90"
            aria-label={`hidden ${egg.id}`}
          >
            {egg.emoji}
          </motion.button>
        ))}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm"
          >
            {toast}
          </motion.div>
        )}
      </div>

      {allFound ? (
        <div className="text-center">
          <p className="font-display text-lg mb-1">You found {EGGS.length}/{EGGS.length} secrets. 🎉</p>
          <p className="text-warmwhite/70 mb-5">Achievement unlocked: Tannu — Certified Detective 🕵️‍♀️</p>
          <PrimaryButton onClick={onNext} className="max-w-xs">
            Continue
          </PrimaryButton>
        </div>
      ) : (
        <PrimaryButton onClick={onNext} className="max-w-xs">
          {found.size > 0 ? "Good enough, continue →" : 'Skip hunt →'}
        </PrimaryButton>
      )}
    </div>
  )
}
