import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, StageHeading } from '../components/UI'
import { heartConfetti } from '../utils/confetti'

export default function FinalQuestion({ state, update }) {
  const [answer, setAnswer] = useState(state.finalAnswer)

  const choose = (val) => {
    setAnswer(val)
    update({ finalAnswer: val })
    heartConfetti()
  }

  return (
    <div className="stage-wrap">
      <p className="text-center text-warmwhite/60 mb-2">Okay... one last question.</p>
      <StageHeading className="text-2xl mb-8">
        Would you join me for a random adventure sometime? 👀
      </StageHeading>

      {!answer ? (
        <div className="w-full max-w-xs space-y-3">
          <button onClick={() => choose('obviously')} className="btn-primary w-full">
            Obviously 😌
          </button>
          <button onClick={() => choose('maybe')} className="btn-ghost w-full">
            Maybe 👀
          </button>
        </div>
      ) : (
        <GlassCard className="text-center">
          <p className="font-display text-xl">
            {answer === 'obviously' ? "I'll remember that answer 👀❤️" : "I'll take that as 'convince me' 😂"}
          </p>
          <p className="text-warmwhite/60 text-sm mt-4">Happy Birthday, Tannu. 🎂❤️</p>
        </GlassCard>
      )}
    </div>
  )
}
