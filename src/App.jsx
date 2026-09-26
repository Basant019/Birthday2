import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './utils/store'
import FloatingParticles from './components/FloatingParticles'
import MusicToggle from './components/MusicToggle'

import Intro from './stages/Intro'
import Mission from './stages/Mission'
import Rules from './stages/Rules'
import BasantQuiz from './stages/BasantQuiz'
import MemoryTest from './stages/MemoryTest'
import TruthOrTrap from './stages/TruthOrTrap'
import RapidFire from './stages/RapidFire'
import PredictBasant from './stages/PredictBasant'
import Profile from './stages/Profile'
import DetectiveMode from './stages/DetectiveMode'
import CharacterCard from './stages/CharacterCard'
import ChaosButton from './stages/ChaosButton'
import FakeAnalysis from './stages/FakeAnalysis'
import SecretFile from './stages/SecretFile'
import EggHunt from './stages/EggHunt'
import MiniGame from './stages/MiniGame'
import AdventureGenerator from './stages/AdventureGenerator'
import ChaosCalculator from './stages/ChaosCalculator'
import ScoreAchievements from './stages/ScoreAchievements'
import FinalResultCard from './stages/FinalResultCard'
import BirthdayReveal from './stages/BirthdayReveal'
import FinalQuestion from './stages/FinalQuestion'

const STAGES = [
  Intro, Mission, Rules, BasantQuiz, MemoryTest, TruthOrTrap, RapidFire,
  PredictBasant, Profile, DetectiveMode, CharacterCard, ChaosButton,
  FakeAnalysis, SecretFile, EggHunt, MiniGame, AdventureGenerator,
  ChaosCalculator, ScoreAchievements, FinalResultCard, BirthdayReveal, FinalQuestion,
]

export default function App() {
  const { state, update, resetAll } = useAppStore()
  const idx = Math.min(state.stageIndex, STAGES.length - 1)
  const Stage = STAGES[idx]

  const goNext = () => update((s) => ({ stageIndex: Math.min(s.stageIndex + 1, STAGES.length - 1) }))
  const goTo = (i) => update({ stageIndex: i })

  return (
    <div className="relative min-h-[100dvh] w-full">
      <FloatingParticles />
      <MusicToggle musicOn={state.musicOn} setMusicOn={(v) => update({ musicOn: v })} />
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10"
        >
          <Stage state={state} update={update} onNext={goNext} goTo={goTo} resetAll={resetAll} stageIndex={idx} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
