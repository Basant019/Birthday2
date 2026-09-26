import React, { useState } from 'react'
import { PREDICT_BASANT } from '../data/basantData'
import { GlassCard, PrimaryButton, ProgressBar, StageHeading, StageSub } from '../components/UI'

export default function PredictBasant({ update, onNext }) {
  const total = PREDICT_BASANT.length
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const item = PREDICT_BASANT[idx]

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === item.correct) update((s) => ({ predictScore: s.predictScore + 1 }))
    update((s) => ({ predictAnswers: [...s.predictAnswers, i] }))
  }

  const next = () => {
    if (idx + 1 >= total) return onNext()
    setIdx((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Predict Basant 🔮</StageHeading>
      <StageSub>What would he actually pick?</StageSub>
      <ProgressBar current={idx + 1} total={total} />
      <GlassCard>
        <p className="font-display text-lg mb-5 text-center">{item.q}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {item.options.map((opt, i) => {
            const show = selected !== null
            const isRight = i === item.correct
            const isPick = i === selected
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                className={`rounded-2xl px-4 py-4 border text-center transition ${
                  show
                    ? isRight
                      ? 'border-green-400/60 bg-green-400/10'
                      : isPick
                      ? 'border-glow-pink/60 bg-glow-pink/10'
                      : 'border-white/10 bg-white/5'
                    : 'glass hover:bg-white/10 active:scale-95'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <div className="text-center">
            <p className="text-warmwhite/80 mb-4">
              Basant's real answer: <span className="font-display">{item.options[item.correct]}</span>
            </p>
            <PrimaryButton onClick={next}>{idx + 1 >= total ? 'See my score' : 'Next'}</PrimaryButton>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
