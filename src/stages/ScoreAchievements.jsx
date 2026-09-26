import React from 'react'
import { motion } from 'framer-motion'
import { ACHIEVEMENT_POOL, quizVerdict } from '../data/basantData'
import { GlassCard, PrimaryButton, StageHeading } from '../components/UI'

export default function ScoreAchievements({ state, onNext }) {
  const earned = ACHIEVEMENT_POOL.filter((a) => a.condition(state))

  return (
    <div className="stage-wrap">
      <StageHeading>MISSION COMPLETE ✅</StageHeading>
      <GlassCard className="text-center mb-6">
        <p className="text-warmwhite/60 text-sm mb-1">Basant Quiz Score</p>
        <p className="font-display text-4xl mb-2">{state.quizScore} / 15</p>
        <p className="text-warmwhite/80">{quizVerdict(state.quizScore)}</p>
      </GlassCard>

      <div className="w-full max-w-md mb-8">
        <p className="text-center text-sm text-warmwhite/60 mb-3">Achievements Unlocked</p>
        <div className="grid grid-cols-2 gap-3">
          {earned.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl px-3 py-4 text-center text-sm"
            >
              {a.label}
            </motion.div>
          ))}
        </div>
      </div>

      <PrimaryButton onClick={onNext} className="max-w-xs">
        See my final result →
      </PrimaryButton>
    </div>
  )
}
