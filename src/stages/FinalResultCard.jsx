import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { generateTitle, ACHIEVEMENT_POOL } from '../data/basantData'
import { PrimaryButton, GhostButton, StageHeading, StageSub } from '../components/UI'

export default function FinalResultCard({ state, onNext }) {
  const cardRef = useRef(null)
  const [tannuName] = useState('Tannu')
  const [saving, setSaving] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const title = generateTitle(state)
  const earnedCount = ACHIEVEMENT_POOL.filter((a) => a.condition(state)).length

  const words = state.profile.describeBasant || '—'
  const impression = state.profile.firstImpression || '—'
  const loves = state.profile.loves || '—'

  const saveImage = async () => {
    if (!cardRef.current) return
    setSaving(true)
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: '#140b1f', scale: 2, useCORS: true })
      const dataUrl = canvas.toDataURL('image/png')
      setImgUrl(dataUrl)

      if (navigator.canShare && navigator.share) {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'tannus-basant-test.png', { type: 'image/png' })
          if (navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ files: [file], title: "Tannu's Basant Test" })
            } catch {
              // user cancelled share — fine, they still have the download link below
            }
          }
        })
      }

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'tannus-basant-test.png'
      link.click()
    } catch (e) {
      console.error('Screenshot failed', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Your Final Result</StageHeading>
      <StageSub>This is the card you'll send to Basant 👀</StageSub>

      <div
        ref={cardRef}
        className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br from-[#1c1029] to-[#0b0710] border border-glow-purple/30 shadow-glass mb-6"
      >
        <p className="text-center text-xs uppercase tracking-wide text-glow-pink mb-1">Tannu's Basant Test</p>
        <p className="text-center font-display text-2xl mb-4">{title}</p>
        <div className="space-y-2 text-sm mb-4">
          <Row label="Basant Quiz Score" value={`${state.quizScore} / 15`} />
          <Row label="Predict Basant Score" value={`${state.predictScore} / 6`} />
          <Row label="Easter Eggs Found" value={`${(state.eggsFound || []).length} / 5`} />
          <Row label="Chaos Score" value={`${state.chaosClicks} clicks`} />
        </div>
        <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
          <Row label="Describes Basant as" value={words} />
          <Row label="First impression" value={impression} />
          <Row label="Loves" value={loves} />
        </div>
        <p className="text-center text-warmwhite/40 text-xs mt-4">Made with 💗 by Basant</p>
      </div>

      <PrimaryButton onClick={saveImage} className="max-w-xs mb-3" disabled={saving}>
        📸 {saving ? 'Saving...' : 'Save My Results'}
      </PrimaryButton>

      {imgUrl && (
        <p className="text-center text-warmwhite/70 text-sm mb-3 max-w-xs">
          Now send this screenshot to Basant 👀 <br />
          You can send it on WhatsApp / Instagram / wherever you normally talk.
        </p>
      )}

      <GhostButton onClick={onNext} className="max-w-xs">
        Continue →
      </GhostButton>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-warmwhite/50">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  )
}
