import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, PrimaryButton, StageHeading, StageSub } from '../components/UI'

const DESTINATIONS = ['Mountains 🏔️', 'City 🏙️', 'Nature 🌿']
const ACTIVITIES = ['Cycling 🚴', 'Trekking 🥾', 'Exploring 🗺️']
const FOODS = ['Pizza 🍕', 'Pasta 🍝', 'Biryani 🍛']
const TIMES = ['Morning ☀️', 'Evening 🌆']

function OptionRow({ label, options, value, onChange }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-warmwhite/70 mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-xl px-2 py-2 text-xs sm:text-sm border transition ${
              value === opt ? 'border-glow-pink/70 bg-glow-pink/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AdventureGenerator({ update, onNext }) {
  const [dest, setDest] = useState(null)
  const [act, setAct] = useState(null)
  const [food, setFood] = useState(null)
  const [time, setTime] = useState(null)
  const [plan, setPlan] = useState(null)

  const canGenerate = dest && act && food && time

  const generate = () => {
    const p = {
      dest, act, food, time,
      lost: Math.floor(40 + Math.random() * 50),
      fun: Math.floor(85 + Math.random() * 15),
      onTime: Math.floor(2 + Math.random() * 20),
    }
    setPlan(p)
    update({ adventurePlan: p })
  }

  return (
    <div className="stage-wrap">
      <StageHeading className="text-2xl">Random Adventure Generator</StageHeading>
      <StageSub>Purely fictional. Results not scientifically guaranteed 😌</StageSub>
      <GlassCard>
        {!plan ? (
          <>
            <OptionRow label="Destination" options={DESTINATIONS} value={dest} onChange={setDest} />
            <OptionRow label="Activity" options={ACTIVITIES} value={act} onChange={setAct} />
            <OptionRow label="Food" options={FOODS} value={food} onChange={setFood} />
            <OptionRow label="Time" options={TIMES} value={time} onChange={setTime} />
            <PrimaryButton onClick={generate} disabled={!canGenerate}>
              Generate Plan
            </PrimaryButton>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <p className="font-display text-lg mb-4">TANNU × BASANT ADVENTURE PROTOCOL</p>
            <div className="text-left space-y-2 mb-5">
              <p>Destination: <b>{plan.dest}</b></p>
              <p>Activity: <b>{plan.act}</b></p>
              <p>Food: <b>{plan.food}</b></p>
              <p>Time: <b>{plan.time}</b></p>
              <p>Chance of getting lost: <b>{plan.lost}%</b></p>
              <p>Chance of having fun: <b>{plan.fun}%</b></p>
              <p>Chance of returning on time: <b>{plan.onTime}%</b> 😂</p>
            </div>
            <PrimaryButton onClick={onNext}>Continue</PrimaryButton>
          </motion.div>
        )}
      </GlassCard>
    </div>
  )
}
