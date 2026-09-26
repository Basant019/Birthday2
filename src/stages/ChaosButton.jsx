import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PHOTOS, randomFrom } from '../data/basantData'
import { PrimaryButton, GhostButton, StageHeading, StageSub } from '../components/UI'
import { burstConfetti, heartConfetti } from '../utils/confetti'

const BASANT_FACTS = [
  'Basant once cycled way further than planned "just to see what was there."',
  'Basant can somehow lose at chess and still call it a strategic decision.',
  "Basant's group chats are 40% memes, 60% trip planning.",
  'Basant has definitely rewritten a text five times before sending it.',
]

const EVENTS = ['confetti', 'shake', 'photo', 'warning', 'fact', 'heart', 'error', 'nothing']

export default function ChaosButton({ state, update, onNext }) {
  const [clicks, setClicks] = useState(state.chaosClicks || 0)
  const [event, setEvent] = useState(null)
  const [shake, setShake] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [fact, setFact] = useState('')

  const click = () => {
    const chosen = randomFrom(EVENTS)
    setEvent(chosen)
    const newClicks = clicks + 1
    setClicks(newClicks)
    update({ chaosClicks: newClicks })

    if (chosen === 'confetti') burstConfetti()
    if (chosen === 'heart') heartConfetti()
    if (chosen === 'shake') {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    if (chosen === 'photo') setPhoto(randomFrom(PHOTOS.funny))
    else setPhoto(null)
    if (chosen === 'fact') setFact(randomFrom(BASANT_FACTS))
  }

  const messages = {
    confetti: '🎉 Confetti! You earned it.',
    shake: '😵 Screen shake achieved. Are you happy now?',
    photo: 'Enjoy this random photo 👇',
    warning: "I told you not to click 😭",
    fact: '📌 Random Basant fact:',
    heart: '💗 A heart appears out of nowhere.',
    error: '⚠️ SYSTEM ERROR: TOO MUCH CHAOS DETECTED.',
    nothing: 'Congratulations, you achieved absolutely nothing.',
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">A Mysterious Button</StageHeading>
      <StageSub>You know you want to.</StageSub>

      <motion.button
        onClick={click}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="btn-primary max-w-xs mb-6 !bg-gradient-to-br !from-red-400 !to-glow-pink"
      >
        DO NOT CLICK
      </motion.button>

      {event && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 max-w-md w-full text-center mb-6"
        >
          <p className="font-display text-lg mb-2">{messages[event]}</p>
          {event === 'fact' && <p className="text-warmwhite/80 text-sm">{fact}</p>}
          {event === 'photo' && photo && (
            <img src={photo} alt="chaos" className="w-32 h-32 object-cover rounded-xl mx-auto mt-2" />
          )}
        </motion.div>
      )}

      {clicks >= 5 ? (
        <div className="text-center">
          <p className="font-display text-lg mb-4">Okay, you REALLY don't follow instructions 😂</p>
          <PrimaryButton onClick={onNext} className="max-w-xs">
            Fine, moving on
          </PrimaryButton>
        </div>
      ) : (
        <GhostButton onClick={onNext} className="max-w-xs">
          I'll behave, skip this →
        </GhostButton>
      )}
    </div>
  )
}
