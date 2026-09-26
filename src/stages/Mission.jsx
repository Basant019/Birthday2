import React from 'react'
import { GlassCard, PrimaryButton, StageHeading, StageSub } from '../components/UI'

export default function Mission({ onNext }) {
  return (
    <div className="stage-wrap">
      <StageHeading>Welcome, Tannu 🎂</StageHeading>
      <StageSub>Today is your birthday...</StageSub>
      <GlassCard className="text-center mb-8">
        <p className="text-warmwhite/90 mb-4">
          But before you get your actual birthday surprise, you have to complete
          one tiny mission.
        </p>
        <div className="rounded-2xl bg-gradient-to-br from-glow-pink/20 to-glow-purple/20 border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-warmwhite/60 mb-1">Mission</p>
          <p className="font-display text-xl">How well do you know Basant?</p>
        </div>
      </GlassCard>
      <PrimaryButton onClick={onNext} className="max-w-xs">
        Accept Mission 🚀
      </PrimaryButton>
    </div>
  )
}
