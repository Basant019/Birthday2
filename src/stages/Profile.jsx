import React, { useState } from 'react'
import { GlassCard, PrimaryButton, GhostButton, StageHeading, StageSub } from '../components/UI'
import TannuProfileCard from '../components/TannuProfileCard'

const FIELDS = [
  { key: 'loves', label: 'One thing you love', required: true },
  { key: 'hates', label: 'One thing you hate', required: false },
  { key: 'happy', label: 'One thing that always makes you happy', required: false },
  { key: 'dream', label: 'Your dream destination', required: true },
  { key: 'fact', label: 'One random fact about yourself', required: false },
  { key: 'words', label: 'Three words that describe yourself', required: false },
  { key: 'weekend', label: 'Your perfect weekend', required: false },
  { key: 'tryOneday', label: 'Something you want to try someday', required: false },
]

const FLIRTY = [
  { key: 'firstImpression', label: 'What was your first impression of Basant?' },
  { key: 'describeBasant', label: 'Describe Basant in 3 words.' },
  { key: 'surprisinglyGood', label: 'One thing you think Basant is surprisingly good at?' },
]

export default function Profile({ state, update, onNext }) {
  const [step, setStep] = useState('intro') // intro -> fields -> flirty -> reaction -> export
  const [values, setValues] = useState(state.profile)
  const [reactionChoice, setReactionChoice] = useState(null)

  const setField = (key, val) => setValues((v) => ({ ...v, [key]: val }))

  const goToExport = () => {
    update({ profile: { ...values } })
    setStep('export')
  }

  if (step === 'intro') {
    return (
      <div className="stage-wrap">
        <StageHeading>Okay Tannu, introduce yourself 👀</StageHeading>
        <StageSub>Everything except the important ones is optional. No pressure.</StageSub>
        <PrimaryButton onClick={() => setStep('fields')} className="max-w-xs">
          Let's do it
        </PrimaryButton>
      </div>
    )
  }

  if (step === 'fields') {
    return (
      <div className="stage-wrap">
        <StageHeading className="text-2xl">Tell me about yourself</StageHeading>
        <GlassCard className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-sm text-warmwhite/70 mb-1 block">
                {f.label} {f.required && <span className="text-glow-pink">*</span>}
              </label>
              <input
                value={values[f.key] || ''}
                onChange={(e) => setField(f.key, e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 outline-none focus:border-glow-purple/60 text-warmwhite placeholder:text-warmwhite/30 text-sm"
                placeholder="Type here..."
              />
            </div>
          ))}
          <PrimaryButton
            onClick={() => setStep('flirty')}
            disabled={!values.loves?.trim() || !values.dream?.trim()}
          >
            Continue
          </PrimaryButton>
        </GlassCard>
      </div>
    )
  }

  if (step === 'flirty') {
    return (
      <div className="stage-wrap">
        <StageHeading className="text-2xl">A few fun ones 👀</StageHeading>
        <StageSub>Totally optional. Answer honestly (or don't 😌).</StageSub>
        <GlassCard className="space-y-4">
          {FLIRTY.map((f) => (
            <div key={f.key}>
              <label className="text-sm text-warmwhite/70 mb-1 block">{f.label}</label>
              <input
                value={values[f.key] || ''}
                onChange={(e) => setField(f.key, e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 outline-none focus:border-glow-purple/60 text-warmwhite placeholder:text-warmwhite/30 text-sm"
                placeholder="Type here (optional)..."
              />
            </div>
          ))}
          <PrimaryButton onClick={() => setStep('reaction')}>Continue</PrimaryButton>
        </GlassCard>
      </div>
    )
  }

  if (step === 'reaction') {
    return (
      <div className="stage-wrap">
        <StageHeading className="text-2xl">One more thing...</StageHeading>
        <StageSub>If Basant randomly says "Chal, adventure pe chalte hain"...</StageSub>
        <GlassCard>
          <div className="grid grid-cols-1 gap-3">
            {["I'm in 😎", 'Where are we going? 😂', 'Let me think 👀', 'Absolutely not 😭'].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setReactionChoice(opt)
                  setField('adventureReaction', opt)
                }}
                className={`glass rounded-2xl px-4 py-3 text-center transition active:scale-95 text-sm font-medium ${
                  reactionChoice === opt ? 'border border-glow-pink/60 bg-glow-pink/10' : 'hover:bg-white/10'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {reactionChoice && (
            <div className="mt-5 text-center">
              <PrimaryButton onClick={goToExport}>Generate My Profile ✨</PrimaryButton>
            </div>
          )}
        </GlassCard>
      </div>
    )
  }

  // Export stage: "Your Tannu Profile is Ready ✨"
  const mergedState = { ...state, profile: values }
  return (
    <div className="stage-wrap py-8">
      <StageHeading className="text-3xl mb-2">Your Tannu Profile is Ready ✨</StageHeading>

      <div className="text-center max-w-md mb-6 space-y-1">
        <p className="text-glow-pink font-semibold text-base sm:text-lg">
          You just revealed a lot about yourself 👀
        </p>
        <p className="text-warmwhite/80 text-xs sm:text-sm">
          Save this and send it to Basant — let's see if he remembers all of it 😂
        </p>
      </div>

      <TannuProfileCard state={mergedState} className="mb-6" />

      <PrimaryButton onClick={onNext} className="max-w-xs">
        Continue Mission →
      </PrimaryButton>
    </div>
  )
}
