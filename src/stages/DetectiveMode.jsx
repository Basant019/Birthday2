import React, { useState } from 'react'
import { GlassCard, PrimaryButton, StageHeading, StageSub } from '../components/UI'

const CASES = [
  {
    clues: ['Likes mountains', 'Has a bicycle', 'Wants to visit Japan'],
    options: ['A random stranger', 'Basant 😂', 'A Bollywood villain', 'Your neighbour'],
    correct: 1,
  },
  {
    clues: ['Plays two very different games', 'One needs silence, one needs reflexes', "Both make him fiercely competitive"],
    options: ['Chess + Free Fire ♟️🔫', 'Ludo + Cricket', 'Cards + Carrom', 'None of these'],
    correct: 0,
  },
  {
    clues: ['Loves three cuisines equally', 'Cannot pick a favourite', 'Will always say "sab achha hai"'],
    options: ['Pizza, Pasta, Biryani 🍕🍝🍛', 'Only Maggi', 'Salad', 'Nothing, he skips meals'],
    correct: 0,
  },
]

export default function DetectiveMode({ update, onNext }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const item = CASES[idx]

  const choose = (i) => {
    if (selected !== null) return
    setSelected(i)
  }

  const next = () => {
    if (idx + 1 >= CASES.length) {
      update({ detectiveDone: true })
      return onNext()
    }
    setIdx((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="stage-wrap">
      <StageHeading>Agent Tannu, we have a case. 🕵️</StageHeading>
      <StageSub>Case {idx + 1} of {CASES.length}</StageSub>
      <GlassCard>
        <div className="space-y-2 mb-5">
          {item.clues.map((c, i) => (
            <p key={i} className="text-warmwhite/80">🔍 {c}</p>
          ))}
        </div>
        <p className="font-display text-lg mb-4 text-center">Identify the suspect.</p>
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
                {opt}
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <div className="text-center mt-5">
            <PrimaryButton onClick={next}>{idx + 1 >= CASES.length ? 'Case closed' : 'Next case'}</PrimaryButton>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
