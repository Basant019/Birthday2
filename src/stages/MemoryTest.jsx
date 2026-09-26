import React, { useState } from 'react'
import { MEMORY_TEST } from '../data/basantData'
import { GlassCard, PrimaryButton, ProgressBar, StageHeading, StageSub } from '../components/UI'

function fuzzyMatch(input, answers) {
  const clean = input.trim().toLowerCase()
  return answers.some((a) => {
    if (clean === a) return true
    if (clean.length > 2 && (a.includes(clean) || clean.includes(a))) return true
    // simple Levenshtein-ish tolerance for small typos
    return levenshtein(clean, a) <= 1
  })
}

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

export default function MemoryTest({ state, update, onNext }) {
  const total = MEMORY_TEST.length
  const [idx, setIdx] = useState(0)
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  const item = MEMORY_TEST[idx]

  const submit = () => {
    if (!value.trim()) return
    const correct = fuzzyMatch(value, item.answers)
    setResult(correct ? 'right' : 'close')
    update((s) => ({ memoryAnswers: [...s.memoryAnswers, { q: item.q, given: value, correct }] }))
  }

  const next = () => {
    if (idx + 1 >= total) {
      onNext()
      return
    }
    setIdx((i) => i + 1)
    setValue('')
    setResult(null)
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">No options this time 👀</StageHeading>
      <StageSub>Type it from memory. We'll be lenient with typos.</StageSub>
      <ProgressBar current={idx + 1} total={total} />
      <GlassCard>
        <p className="font-display text-lg mb-5 text-center">{item.q}</p>
        {result === null ? (
          <>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="Type your answer..."
              className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 mb-4 outline-none focus:border-glow-purple/60 text-warmwhite placeholder:text-warmwhite/40"
              autoFocus
            />
            <PrimaryButton onClick={submit} disabled={!value.trim()}>
              Submit
            </PrimaryButton>
          </>
        ) : (
          <div className="text-center">
            <p className="font-display text-xl mb-4">
              {result === 'right' ? 'You remembered! 🎉' : 'Close enough 😂'}
            </p>
            <p className="text-warmwhite/70 mb-4 text-sm">
              Correct answer: <span className="text-warmwhite">{item.answers[0]}</span>
            </p>
            <PrimaryButton onClick={next}>Continue</PrimaryButton>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
