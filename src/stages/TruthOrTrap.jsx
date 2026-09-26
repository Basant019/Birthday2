import React, { useState } from 'react'
import { TRUTH_OR_TRAP } from '../data/basantData'
import { GlassCard, PrimaryButton, ProgressBar, StageHeading, StageSub } from '../components/UI'

export default function TruthOrTrap({ update, onNext }) {
  const total = TRUTH_OR_TRAP.length
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const item = TRUTH_OR_TRAP[idx]

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === item.correct) update((s) => ({ trapScore: s.trapScore + 1 }))
  }

  const next = () => {
    if (idx + 1 >= total) return onNext()
    setIdx((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Truth or Trap 👀</StageHeading>
      <StageSub>One of these options is way too tempting. Choose wisely.</StageSub>
      <ProgressBar current={idx + 1} total={total} />
      <GlassCard>
        <p className="font-display text-lg mb-5 text-center">{item.q}</p>
        <div className="space-y-3">
          {item.options.map((opt, i) => {
            const show = selected !== null
            const isRight = i === item.correct
            const isPick = i === selected
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`w-full text-left rounded-2xl px-4 py-3 border transition ${
                  show
                    ? isRight
                      ? 'border-green-400/60 bg-green-400/10'
                      : isPick
                      ? 'border-glow-pink/60 bg-glow-pink/10'
                      : 'border-white/10 bg-white/5'
                    : 'glass hover:bg-white/10 active:scale-95'
                }`}
              >
                {opt} {show && isRight && '✅'}
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <div className="text-center mt-5">
            <p className="text-warmwhite/80 mb-4 font-display">
              {selected === item.correct ? 'Not a trap this time 👀' : 'Ooh, that was the trap 😂'}
            </p>
            <PrimaryButton onClick={next}>Continue</PrimaryButton>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
