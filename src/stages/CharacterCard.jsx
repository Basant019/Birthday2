import React from 'react'
import { motion } from 'framer-motion'
import { PrimaryButton, StageHeading, StageSub } from '../components/UI'

const STATS = [
  { label: 'Class', value: 'Explorer' },
  { label: 'Main Skill', value: 'Cycling 🚴' },
  { label: 'Special Skill', value: 'Martial Arts 🥋' },
  { label: 'Side Quest', value: 'Chess ♟️' },
  { label: 'Weakness', value: 'Pizza 🍕' },
  { label: 'Dream Destination', value: 'Japan 🇯🇵' },
  { label: 'Secret Ability', value: 'Texting Crush 👀' },
]

export default function CharacterCard({ onNext }) {
  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Player Card Unlocked</StageHeading>
      <StageSub>Loading Basant's stats...</StageSub>
      <motion.div
        initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm rounded-3xl p-1 bg-gradient-to-br from-glow-pink via-glow-purple to-glow-pink shadow-glass mb-8"
      >
        <div className="rounded-[22px] bg-bg2/95 p-6">
          <p className="text-center font-display text-2xl mb-1">BASANT</p>
          <p className="text-center text-xs uppercase tracking-wide text-warmwhite/50 mb-5">
            Adventure-Class Legend
          </p>
          <div className="space-y-3">
            {STATS.map((s) => (
              <div key={s.label} className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-warmwhite/60 text-sm">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <PrimaryButton onClick={onNext} className="max-w-xs">
        Continue
      </PrimaryButton>
    </div>
  )
}
