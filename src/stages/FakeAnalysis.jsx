import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, PrimaryButton, StageHeading, StageSub } from '../components/UI'

export default function FakeAnalysis({ state, onNext }) {
  const [phase, setPhase] = useState('loading')
  const basantKnowledgePct = Math.round((state.quizScore / 15) * 100)

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 1800)
    return () => clearTimeout(t)
  }, [])

  const metrics = [
    { label: 'Curiosity', value: 96 },
    { label: 'Chaos Level', value: 91 },
    { label: 'Basant Knowledge', value: basantKnowledgePct },
    { label: 'Cheating Probability', value: 13 },
    { label: 'Adventure Potential', value: 94 },
  ]

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">ANALYZING TANNU...</StageHeading>
      <StageSub>This is definitely a very real and scientific analysis 😌</StageSub>
      <GlassCard>
        {phase === 'loading' ? (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-10 h-10 mx-auto rounded-full border-4 border-glow-purple/30 border-t-glow-pink mb-4"
            />
            <p className="text-warmwhite/70">Running deeply unscientific calculations...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{m.label}</span>
                    <span>{m.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-glow-pink to-glow-purple"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center font-display text-lg mb-5">
              Final diagnosis: Knows more than she admits.
            </p>
            <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
          </>
        )}
      </GlassCard>
    </div>
  )
}
