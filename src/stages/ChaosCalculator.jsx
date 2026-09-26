import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, PrimaryButton, StageHeading, StageSub } from '../components/UI'
import { burstConfetti } from '../utils/confetti'

const STEPS = ['Analyzing...', 'Checking chaos levels...', 'Consulting the universe...']

export default function ChaosCalculator({ onNext }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (stepIdx < STEPS.length) {
      const t = setTimeout(() => setStepIdx((i) => i + 1), 900)
      return () => clearTimeout(t)
    } else {
      setDone(true)
      burstConfetti()
    }
  }, [stepIdx])

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Chaos Calculator</StageHeading>
      <StageSub>Inputs: Cycling + Random Plans + Good Food + Adventure</StageSub>
      <GlassCard className="text-center">
        {!done ? (
          <div className="py-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-10 h-10 mx-auto rounded-full border-4 border-glow-purple/30 border-t-glow-pink mb-4"
            />
            <p className="text-warmwhite/70">{STEPS[Math.min(stepIdx, STEPS.length - 1)]}</p>
          </div>
        ) : (
          <>
            <p className="font-display text-2xl mb-2">Adventure Compatibility: 97% 😂</p>
            <p className="text-xs text-warmwhite/50 mb-5">
              (This is a joke calculator, not a real assessment of anything.)
            </p>
            <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
          </>
        )}
      </GlassCard>
    </div>
  )
}
