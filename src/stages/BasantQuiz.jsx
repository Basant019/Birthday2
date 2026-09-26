import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASANT_QUIZ, PHOTOS, randomFrom } from '../data/basantData'
import { GlassCard, PrimaryButton, ProgressBar, StageHeading } from '../components/UI'
import { burstConfetti } from '../utils/confetti'

export default function BasantQuiz({ state, update, onNext }) {
  const total = BASANT_QUIZ.length
  const [qIndex, setQIndex] = useState(state.quizAnswers.length < total ? state.quizAnswers.length : 0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const question = BASANT_QUIZ[qIndex]
  const isCorrect = question.correct === -1 || selected === question.correct

  const choose = (i) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (question.correct === -1 || i === question.correct) burstConfetti()
    update((s) => ({
      quizAnswers: [...s.quizAnswers, i],
      quizScore: s.quizScore + (question.correct === -1 || i === question.correct ? 1 : 0),
    }))
  }

  const next = () => {
    if (qIndex + 1 >= total) {
      onNext()
      return
    }
    setQIndex((i) => i + 1)
    setSelected(null)
    setAnswered(false)
  }

  const reactionText = question.correct === -1
    ? "No wrong answers here 😌"
    : isCorrect
    ? question.reaction || 'Okayyy, someone has been paying attention 👀'
    : "Tannu... we need to talk. 😂"

  const reactionPhoto = isCorrect ? randomFrom(PHOTOS.cute) : randomFrom(PHOTOS.funny)

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl sm:text-3xl">How Well Do You Know Basant?</StageHeading>
      <ProgressBar current={qIndex + 1} total={total} />
      <GlassCard>
        <p className="font-display text-lg sm:text-xl mb-5 text-center">{question.q}</p>
        {!answered && (
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(i)}
                className="w-full text-left glass rounded-2xl px-4 py-3 hover:bg-white/10 active:scale-95 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="space-y-3 mb-4">
                {question.options.map((opt, i) => {
                  const isPick = i === selected
                  const isRight = question.correct !== -1 && i === question.correct
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl px-4 py-3 border ${
                        isRight
                          ? 'border-green-400/60 bg-green-400/10'
                          : isPick
                          ? 'border-glow-pink/60 bg-glow-pink/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      {opt} {isRight && '✅'} {isPick && !isRight && '👈'}
                    </div>
                  )
                })}
              </div>
              <img
                src={reactionPhoto}
                alt="reaction"
                className="w-32 h-32 object-cover rounded-2xl mx-auto mb-3 border border-white/10"
              />
              <p className="font-display text-lg mb-4">{reactionText}</p>
              <PrimaryButton onClick={next}>Continue</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  )
}
