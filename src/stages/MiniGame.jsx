import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PrimaryButton, StageHeading, StageSub } from '../components/UI'
import { randomFrom } from '../data/basantData'

const EMOJIS = ['❤️', '❤️', '❤️', '🚴', '🍕', '♟️', '⭐']
const GAME_SECONDS = 12

export default function MiniGame({ update, onNext }) {
  const [status, setStatus] = useState('idle') // idle | playing | done
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS)
  const [items, setItems] = useState([])
  const spawnRef = useRef(null)
  const timerRef = useRef(null)
  const idRef = useRef(0)

  const start = () => {
    setStatus('playing')
    setScore(0)
    setTimeLeft(GAME_SECONDS)
    setItems([])
  }

  useEffect(() => {
    if (status !== 'playing') return
    spawnRef.current = setInterval(() => {
      idRef.current += 1
      const id = idRef.current
      setItems((prev) => [
        ...prev,
        { id, emoji: randomFrom(EMOJIS), left: 10 + Math.random() * 75, top: 10 + Math.random() * 65 },
      ])
      setTimeout(() => setItems((prev) => prev.filter((it) => it.id !== id)), 1400)
    }, 550)

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(spawnRef.current)
          clearInterval(timerRef.current)
          setStatus('done')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      clearInterval(spawnRef.current)
      clearInterval(timerRef.current)
    }
  }, [status])

  useEffect(() => {
    if (status === 'done') update({ miniGameScore: score })
  }, [status])

  const tap = (id, emoji) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (emoji === '❤️') setScore((s) => s + 1)
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Catch the Hearts ❤️</StageHeading>
      <StageSub>Tap the hearts, ignore everything else. {GAME_SECONDS} seconds.</StageSub>

      {status === 'idle' && (
        <PrimaryButton onClick={start} className="max-w-xs">
          Start
        </PrimaryButton>
      )}

      {status === 'playing' && (
        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm mb-2 px-1">
            <span>Score: {score}</span>
            <span>⏱ {timeLeft}s</span>
          </div>
          <div className="relative w-full h-[340px] glass rounded-3xl overflow-hidden">
            {items.map((it) => (
              <motion.button
                key={it.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ position: 'absolute', top: `${it.top}%`, left: `${it.left}%` }}
                onClick={() => tap(it.id, it.emoji)}
                className="text-3xl active:scale-75"
              >
                {it.emoji}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className="text-center">
          <p className="font-display text-xl mb-2">Mission score: {score}</p>
          <p className="text-warmwhite/70 mb-5">
            {score >= 10 ? 'Certified heart-catcher 💗' : 'Not bad for a first try 👀'}
          </p>
          <PrimaryButton onClick={onNext} className="max-w-xs">
            Continue
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
