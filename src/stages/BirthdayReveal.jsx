import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHOTOS } from '../data/basantData'
import { PrimaryButton } from '../components/UI'
import { burstConfetti } from '../utils/confetti'

const PRE_LINES = ['Wait...', 'You thought that was the end?']
const REVEAL_LINES = ['Tannu...', 'Forget the quiz for a second.']

const MESSAGE = `Happy Birthday, Tannu ❤️

I hope this year brings you lots of happiness, crazy memories, random adventures, and all the things you've been wishing for.

Stay the same funny, amazing and slightly annoying person you are 😂

Have an amazing birthday and enjoy your day.

And maybe... keep a little time for random adventures too. 👀

Happy Birthday once again! 🎂❤️`

export default function BirthdayReveal({ onNext }) {
  const [phase, setPhase] = useState('pre') // pre -> black -> reveal -> message
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const lines = phase === 'pre' ? PRE_LINES : phase === 'reveal' ? REVEAL_LINES : []
    if (lines.length === 0) return
    if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => setLineIdx((i) => i + 1), 1600)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        if (phase === 'pre') {
          setPhase('reveal')
          setLineIdx(0)
        } else if (phase === 'reveal') {
          setPhase('message')
          window.dispatchEvent(new CustomEvent('birthday-reveal-started'))
          burstConfetti()
          setTimeout(burstConfetti, 500)
        }
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [phase, lineIdx])

  if (phase === 'pre' || phase === 'reveal') {
    const lines = phase === 'pre' ? PRE_LINES : REVEAL_LINES
    return (
      <div className="stage-wrap bg-black min-h-[100dvh]">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase + lineIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7 }}
            className="font-display text-2xl sm:text-3xl text-center glow-text px-6"
          >
            {lines[lineIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="stage-wrap">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl sm:text-5xl text-center glow-text mb-1"
      >
        HAPPY BIRTHDAY ❤️
      </motion.h1>
      <p className="text-center text-warmwhite/70 mb-6">26 September 🎂</p>
      <motion.img
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        src={PHOTOS.best}
        alt="Tannu"
        className="w-48 h-48 object-cover rounded-3xl border border-white/15 shadow-glass mb-6"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-6 max-w-md w-full whitespace-pre-line text-warmwhite/90 leading-relaxed mb-8"
      >
        {MESSAGE}
      </motion.div>
      <PrimaryButton onClick={onNext} className="max-w-xs">
        One more thing →
      </PrimaryButton>
    </div>
  )
}
