import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PrimaryButton } from '../components/UI'

const LINES = ['Tannu...', "Before you scroll away...", 'I have a tiny challenge for you 👀']

export default function Intro({ onNext }) {
  const [lineIdx, setLineIdx] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => setLineIdx((i) => i + 1), 1800)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setShowButton(true), 1200)
      return () => clearTimeout(t)
    }
  }, [lineIdx])

  return (
    <div className="stage-wrap bg-black min-h-[100dvh]">
      <div className="h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl sm:text-3xl text-center text-warmwhite glow-text px-6"
          >
            {LINES[lineIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs mt-8"
          >
            <PrimaryButton onClick={onNext}>Okay, what's the challenge?</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
