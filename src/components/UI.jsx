import React from 'react'
import { motion } from 'framer-motion'

export function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-3xl shadow-glass p-6 w-full max-w-md ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function PrimaryButton({ children, onClick, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary w-full disabled:opacity-40 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  )
}

export function GhostButton({ children, onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`btn-ghost w-full ${className}`}>
      {children}
    </button>
  )
}

export function ProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className="w-full max-w-md mb-4">
      <div className="flex justify-between text-xs text-warmwhite/70 mb-1 font-body">
        <span>Question {current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-glow-pink to-glow-purple"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  )
}

export function StageHeading({ children, className = '' }) {
  return (
    <h1 className={`font-display text-3xl sm:text-4xl text-center glow-text mb-3 ${className}`}>
      {children}
    </h1>
  )
}

export function StageSub({ children, className = '' }) {
  return <p className={`text-center text-warmwhite/80 mb-6 font-body ${className}`}>{children}</p>
}
