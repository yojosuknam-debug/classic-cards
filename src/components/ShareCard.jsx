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

const ShareCard = forwardRef(function ShareCard({ card, pack }, ref) {
  const scriptFont = FONT_MAP[pack?.scriptFont || 'serif']
  const isRTL = pack?.scriptDir === 'rtl'
  const gradient = getGradient(pack?.color || 'from-slate-800 to-slate-950')
  const accentHex = getAccentHex(pack?.accentColor)

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
        padding: '80px 72px',
        fontFamily: '"Noto Sans KR", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 장식 원 */}
      <div style={{
        position: 'absolute',
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.02)',
        pointerEvents: 'none',
      }} />

      {/* 상단: 출처 */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            {pack?.emoji} {card.source.work}
          </div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)' }}>
            {card.source.chapter} · {card.source.era}
          </div>
        </div>
      </div>

      {/* 중앙: 원문 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 40,
        padding: '60px 0',
      }}>
        {/* 구분선 위 */}
        <div style={{ width: 60, height: 2, background: accentHex, opacity: 0.6 }} />

        {/* 원문 */}
        <div style={{
          fontFamily: scriptFont,
          fontSize: isRTL ? 90 : 80,
          fontWeight: 600,
          color: accentHex,
          textAlign: 'center',
          direction: isRTL ? 'rtl' : 'ltr',
          lineHeight: 1.5,
          letterSpacing: isRTL ? 0 : '0.05em',
          maxWidth: '90%',
          wordBreak: 'break-word',
        }}>
          {card.originalText}
        </div>

        {/* 구분선 아래 */}
        <div style={{ width: 60, height: 2, background: accentHex, opacity: 0.6 }} />

        {/* 한국어 번역 */}
        <div style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: 40,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          lineHeight: 1.7,
          maxWidth: '88%',
        }}>
          {card.originalTextKo}
        </div>
      </div>

      {/* 하단: 오늘 적용하기 + 워터마크 */}
      <div style={{ width: '100%' }}>
        {/* 적용 팁 배경 박스 */}
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '28px 36px',
          marginBottom: 40,
          borderLeft: `4px solid ${accentHex}`,
        }}>
          <div style={{ fontSize: 22, color: accentHex, marginBottom: 10, fontWeight: 600 }}>
            오늘 적용하기
          </div>
          <div style={{
            fontFamily: '"Noto Sans KR", sans-serif',
            fontSize: 26,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
          }}>
            {card.applyTip}
          </div>
        </div>

        {/* 워터마크 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
            고전 전략 카드덱
          </div>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)' }} />
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
