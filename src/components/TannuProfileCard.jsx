import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

export function getCleanProfileData(state) {
  const rf = state.rapidFire || {}
  const pr = state.profile || {}

  const rawMap = [
    { key: 'loves', label: 'One Thing She Loves', icon: '❤️', value: pr.loves },
    { key: 'hates', label: 'One Thing She Dislikes', icon: '🚫', value: pr.hates },
    { key: 'happy', label: 'What Makes Her Happy', icon: '😊', value: pr.happy },
    { key: 'food', label: 'Favourite Food', icon: '🍕', value: rf.food || rf.pizzaBiryani },
    { key: 'colour', label: 'Favourite Colour', icon: '🎨', value: rf.colour },
    { key: 'music', label: 'Favourite Music', icon: '🎵', value: rf.music },
    { key: 'movie', label: 'Favourite Movie / Anime Vibe', icon: '🎬', value: rf.movie },
    { key: 'hobby', label: 'Favourite Hobby', icon: '💃', value: rf.hobby },
    { key: 'dream', label: 'Dream Destination', icon: '🌎', value: pr.dream || rf.dream },
    { key: 'mtnBeach', label: 'Mountains vs Beach', icon: '🏔️', value: rf.mtnBeach },
    { key: 'time', label: 'Morning vs Night', icon: '☀️', value: rf.time },
    { key: 'contact', label: 'Call vs Text', icon: '💬', value: rf.contact },
    { key: 'tripStyle', label: 'Trip Style', icon: '🎒', value: rf.tripStyle },
    { key: 'weekend', label: 'Perfect Weekend', icon: '🚗', value: pr.weekend || rf.weekend },
    { key: 'fact', label: 'Random Fact', icon: '💡', value: pr.fact },
    { key: 'words', label: 'Three Words Describing Herself', icon: '✨', value: pr.words },
    { key: 'tryOneday', label: 'Wants to Try Someday', icon: '🔮', value: pr.tryOneday },
    { key: 'firstImpression', label: 'First Impression of Basant', icon: '👁️', value: pr.firstImpression },
    { key: 'describeBasant', label: 'Describe Basant in 3 Words', icon: '📝', value: pr.describeBasant },
    { key: 'surprisinglyGood', label: 'Basant is Good At', icon: '⭐', value: pr.surprisinglyGood },
    { key: 'adventureReaction', label: 'Random Adventure Reaction', icon: '🏎️', value: pr.adventureReaction },
  ]

  const cleanData = {}
  rawMap.forEach((item) => {
    if (item.value && item.value.trim && item.value.trim() !== '') {
      cleanData[item.label] = item.value.trim()
    }
  })

  return { rawMap, cleanData }
}

export default function TannuProfileCard({ state, className = '' }) {
  const cardRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [shareMsg, setShareMsg] = useState(null)

  const { rawMap, cleanData } = getCleanProfileData(state)
  const activeFields = rawMap.filter((item) => item.value && item.value.trim && item.value.trim() !== '')

  // 1. Save JSON profile
  const downloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cleanData, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'tannu-profile-26-sep.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // 2. Save PNG image using html2canvas
  const downloadImage = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#0b0710',
        useCORS: true,
        logging: false,
      })
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'tannu-profile-26-sep.png'
      link.click()
    } catch (err) {
      console.error('Failed to generate profile card image', err)
    } finally {
      setDownloading(false)
    }
  }

  // 3. Share with Basant
  const shareProfile = async () => {
    setShareMsg(null)
    if (navigator.share) {
      try {
        // Try generating image blob for direct share if possible
        let fileToShare = null
        if (cardRef.current) {
          try {
            const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#0b0710' })
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
            if (blob) {
              fileToShare = new File([blob], 'tannu-profile-26-sep.png', { type: 'image/png' })
            }
          } catch {}
        }

        if (fileToShare && navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
          await navigator.share({
            title: 'Tannu Personal Profile ✨',
            text: 'Here is my Tannu Personal Profile — let’s see if you remember all of it! 😂',
            files: [fileToShare],
          })
          return
        }

        // Fallback text share
        await navigator.share({
          title: 'Tannu Personal Profile ✨',
          text: `Tannu Personal Profile ✨:\n\n${Object.entries(cleanData)
            .map(([k, v]) => `• ${k}: ${v}`)
            .join('\n')}\n\nSent to Basant 👀`,
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShareMsg('Save the file above and send it to Basant manually 👀')
        }
      }
    } else {
      setShareMsg('Save the file above and send it to Basant manually 👀')
    }
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      {/* Profile Card Render Container */}
      <div
        ref={cardRef}
        id="tannu-profile-card"
        className="glass rounded-3xl p-6 border border-white/20 shadow-glass relative overflow-hidden bg-gradient-to-b from-white/10 via-white/5 to-purple-950/30"
      >
        {/* Glow accent decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-glow-pink/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-glow-purple/30 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="text-center mb-6 border-b border-white/10 pb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-warmwhite/80 tracking-wider uppercase mb-2">
            26 September 🎂
          </div>
          <h2 className="font-display text-2xl sm:text-3xl glow-text text-warmwhite tracking-wide">
            TANNU — PERSONAL PROFILE ✨
          </h2>
          <p className="text-xs text-warmwhite/60 mt-1">Confidential & Voluntary Dossier 👀</p>
        </div>

        {/* Answer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {activeFields.map((f) => (
            <div
              key={f.key}
              className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-base">{f.icon}</span>
                <span className="text-xs font-medium text-warmwhite/60 tracking-tight">{f.label}</span>
              </div>
              <p className="text-sm font-semibold text-warmwhite break-words pl-1 leading-snug">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Card Footer */}
        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-xs text-warmwhite/50 font-display italic">
            Created for Tannu’s Birthday Mission • Strictly Client-Side
          </p>
        </div>
      </div>

      {/* Sharing & Download Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={downloadJSON}
          className="btn-ghost w-full flex items-center justify-center space-x-2 text-sm py-3"
        >
          <span>📄</span>
          <span>SAVE MY PROFILE (.JSON)</span>
        </button>

        <button
          onClick={downloadImage}
          disabled={downloading}
          className="btn-ghost w-full flex items-center justify-center space-x-2 text-sm py-3 disabled:opacity-50"
        >
          <span>📸</span>
          <span>{downloading ? 'GENERATING IMAGE...' : 'SAVE AS IMAGE (.PNG)'}</span>
        </button>

        <button
          onClick={shareProfile}
          className="btn-primary w-full flex items-center justify-center space-x-2 text-sm py-3"
        >
          <span>📤</span>
          <span>SHARE WITH BASANT 👀</span>
        </button>

        {shareMsg && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-center text-glow-pink font-medium bg-glow-pink/10 border border-glow-pink/20 rounded-xl p-3"
          >
            {shareMsg}
          </motion.p>
        )}
      </div>
    </div>
  )
}
