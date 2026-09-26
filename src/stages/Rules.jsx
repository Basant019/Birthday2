import React from 'react'
import { motion } from 'framer-motion'
import { PrimaryButton, StageHeading } from '../components/UI'

const RULES = [
  { n: '01', text: 'No Google 😌' },
  { n: '02', text: 'No cheating 😂' },
  { n: '03', text: 'Go with your first instinct.' },
  { n: '04', text: 'Some questions are traps. 👀' },
  { n: '05', text: 'Have fun.' },
]

export default function Rules({ onNext }) {
  return (
    <div className="stage-wrap">
      <StageHeading>The Rules</StageHeading>
      <div className="w-full max-w-md space-y-3 mb-8">
        {RULES.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass rounded-2xl px-5 py-4 flex items-center gap-4"
          >
            <span className="font-display text-glow-pink text-lg">{r.n}</span>
            <span className="text-warmwhite/90">{r.text}</span>
          </motion.div>
        ))}
      </div>
      <p className="font-display text-xl mb-6">Ready, Tannu?</p>
      <PrimaryButton onClick={onNext} className="max-w-xs">
        Let's Go →
      </PrimaryButton>
    </div>
  )
}
