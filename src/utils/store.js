import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'tannu-birthday-state-v1'

const defaultState = {
  stageIndex: 0,
  quizAnswers: [], // index of chosen option per question
  quizScore: 0,
  memoryAnswers: [],
  trapScore: 0,
  rapidFire: {}, // key -> chosen option text
  predictAnswers: [],
  predictScore: 0,
  profile: {
    loves: '', hates: '', happy: '', dream: '', fact: '', words: '', weekend: '', tryOneday: '',
    firstImpression: '', describeBasant: '', surprisinglyGood: '', adventureReaction: '',
  },
  detectiveDone: false,
  chaosClicks: 0,
  secretUnlocked: false,
  eggsFound: [],
  miniGameScore: 0,
  adventurePlan: null,
  finalAnswer: null,
  musicOn: false,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function useAppStore() {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage full or unavailable — fail silently, experience still works in-memory
    }
  }, [state])

  const update = useCallback((patch) => {
    setState((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }))
  }, [])

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setState(defaultState)
  }, [])

  return { state, update, resetAll }
}
