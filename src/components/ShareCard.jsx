import { forwardRef } from 'react'

const FONT_MAP = {
  arabic:     '"Noto Naskh Arabic", serif',
  hebrew:     '"Noto Serif Hebrew", serif',
  devanagari: '"Noto Serif Devanagari", serif',
  japanese:   '"Noto Serif JP", serif',
  serif:      '"Noto Serif KR", serif',
}

const GRADIENT_MAP = {
  'from-slate-700 to-slate-900':     ['#334155', '#0f172a'],
  'from-emerald-700 to-emerald-900': ['#047857', '#064e3b'],
  'from-red-800 to-red-900':         ['#991b1b', '#7f1d1d'],
  'from-violet-700 to-violet-900':   ['#6d28d9', '#4c1d95'],
  'from-teal-700 to-teal-900':       ['#0f766e', '#134e4a'],
  'from-orange-800 to-orange-900':   ['#9a3412', '#7c2d12'],
  'from-rose-700 to-rose-900':       ['#be123c', '#881337'],
  'from-amber-700 to-amber-900':     ['#b45309', '#78350f'],
  'from-indigo-700 to-indigo-900':   ['#4338ca', '#312e81'],
  'from-yellow-700 to-yellow-900':   ['#a16207', '#713f12'],
  'from-zinc-700 to-zinc-900':       ['#3f3f46', '#18181b'],
}

function getGradient(colorClass) {
  const found = GRADIENT_MAP[colorClass]
  if (found) return `linear-gradient(145deg, ${found[0]}, ${found[1]})`
  return 'linear-gradient(145deg, #1e293b, #020617)'
}

function getOriginalFontSize(text, isRTL) {
  const len = text.length
  const base = isRTL ? 92 : 82
  if (len > 40) return base * 0.55
  if (len > 30) return base * 0.65
  if (len > 20) return base * 0.80
  if (len > 12) return base * 0.90
  return base
}

function getKoFontSize(text) {
  const len = text.length
  if (len > 40) return 30
  if (len > 28) return 34
  return 43
}

function getApplyTipClamp(originalLen, koLen) {
  if (originalLen > 30 || koLen > 28) return 2
  return 3
}

const ShareCard = forwardRef(function ShareCard({ card, pack }, ref) {
  const scriptFont = FONT_MAP[pack?.scriptFont || 'serif']
  const isRTL = pack?.scriptDir === 'rtl'
  const gradient = getGradient(pack?.color || 'from-slate-700 to-slate-900')
  const accentHex = getAccentHex(pack?.accentColor)

  const origFontSize = getOriginalFontSize(card.originalText, isRTL)
  const koFontSize = getKoFontSize(card.originalTextKo)
  const tipClamp = getApplyTipClamp(card.originalText.length, card.originalTextKo.length)

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1080,
        background: gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '72px 80px',
        fontFamily: '"Noto Sans KR", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 원 */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -150, left: -150,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
      }} />

      {/* 상단: 출처 */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontWeight: 500 }}>
            {pack?.emoji} {card.source.work}
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
            {card.source.chapter} · {card.source.era}
          </div>
        </div>
        {/* 상단 우측 포인트 장식 */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: accentHex, opacity: 0.7, marginTop: 10,
        }} />
      </div>

      {/* 중앙: 원문 영역 — 계층 강조 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 36,
        padding: '48px 0',
      }}>
        {/* 구분선 위 */}
        <div style={{ width: 48, height: 2, background: accentHex, opacity: 0.5 }} />

        {/* 원문 — 최대 볼드·가장 크게 */}
        <div style={{
          fontFamily: scriptFont,
          fontSize: origFontSize,
          fontWeight: 800,
          color: accentHex,
          textAlign: 'center',
          direction: isRTL ? 'rtl' : 'ltr',
          lineHeight: 1.45,
          letterSpacing: isRTL ? 0 : '0.06em',
          maxWidth: '90%',
          wordBreak: 'break-word',
        }}>
          {card.originalText}
        </div>

        {/* 구분선 아래 */}
        <div style={{ width: 48, height: 2, background: accentHex, opacity: 0.5 }} />

        {/* 한국어 번역 — 얇게, 중간 크기 */}
        <div style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: koFontSize,
          fontWeight: 300,
          color: 'rgba(255,255,255,0.82)',
          textAlign: 'center',
          lineHeight: 1.7,
          maxWidth: '86%',
          letterSpacing: '0.01em',
        }}>
          {card.originalTextKo}
        </div>
      </div>

      {/* 하단: 적용 팁 + 워터마크 */}
      <div style={{ width: '100%' }}>
        {/* 적용 팁 박스 */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: '24px 32px',
          marginBottom: 36,
          borderLeft: `3px solid ${accentHex}`,
        }}>
          <div style={{ fontSize: 26, color: accentHex, marginBottom: 10, fontWeight: 600, letterSpacing: '0.08em' }}>
            오늘 적용하기
          </div>
          <div style={{
            fontFamily: '"Noto Sans KR", sans-serif',
            fontSize: 52,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.65,
            display: '-webkit-box',
            WebkitLineClamp: tipClamp,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {card.applyTip}
          </div>
        </div>

        {/* 워터마크 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', fontWeight: 300 }}>
            고전 전략 카드덱
          </div>
          <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  )
})

function getAccentHex(accentColorClass) {
  const map = {
    'text-amber-400':   '#fbbf24',
    'text-emerald-300': '#6ee7b7',
    'text-red-300':     '#fca5a5',
    'text-violet-300':  '#c4b5fd',
    'text-teal-300':    '#5eead4',
    'text-orange-300':  '#fdba74',
    'text-rose-300':    '#fda4af',
    'text-yellow-300':  '#fde047',
    'text-indigo-300':  '#a5b4fc',
    'text-zinc-300':    '#d4d4d8',
    'text-sky-300':     '#7dd3fc',
  }
  return map[accentColorClass] || '#fbbf24'
}

export default ShareCard
