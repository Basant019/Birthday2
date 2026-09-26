import React, { useMemo } from 'react'

// Soft floating hearts + dots drifting up the background.
export default function FloatingParticles({ count = 14 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 10 + Math.random() * 14,
        isHeart: Math.random() > 0.45,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 opacity-0 animate-floatUp select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.isHeart ? '💗' : '✨'}
        </span>
      ))}
    </div>
  )
}
