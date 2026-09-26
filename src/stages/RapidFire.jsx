import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RAPID_FIRE } from '../data/basantData'
import { GlassCard, PrimaryButton, ProgressBar, StageHeading, StageSub } from '../components/UI'

export default function RapidFire({ update, onNext }) {
  const total = RAPID_FIRE.length
  const [idx, setIdx] = useState(0)
  const item = RAPID_FIRE[idx]

  const choose = (opt) => {
    update((s) => ({ rapidFire: { ...s.rapidFire, [item.key]: opt } }))
    if (idx + 1 >= total) return onNext()
    setIdx((i) => i + 1)
  }

  return (
    <div className="stage-wrap">
      {idx === 0 && (
        <div className="text-center mb-4">
          <p className="font-display text-xl">Okay, enough about me.</p>
          <p className="font-display text-xl text-glow-pink">Your turn.</p>
        </div>
      )}
      <StageHeading className="text-2xl">Rapid Fire ⚡</StageHeading>
      <StageSub>Tap fast. First instinct only.</StageSub>
      <ProgressBar current={idx + 1} total={total} />
      <GlassCard>
        <motion.p
          key={item.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-lg mb-5 text-center"
        >
          {item.q}
        </motion.p>
        <div className={`grid ${item.options.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
          {item.options.map((opt) => (
            <button
              key={opt}
              onClick={() => choose(opt)}
              className="glass rounded-2xl px-4 py-4 text-center hover:bg-white/10 active:scale-95 transition font-medium"
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
